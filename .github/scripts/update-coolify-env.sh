#!/usr/bin/env bash
set -euo pipefail

# update-coolify-env.sh <env_file> <coolify_uuid>

if [ $# -lt 2 ]; then
	echo "Usage: $0 <env_file> <coolify_uuid>"
	exit 1
fi

ENV_FILE="$1"
COOLIFY_UUID="$2"

if [ -z "${COOLIFY_PAT:-}" ]; then
	echo "Error: COOLIFY_PAT environment variable is not set"
	exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
	echo "Error: Environment file '$ENV_FILE' not found"
	exit 1
fi

if [ -z "$COOLIFY_UUID" ]; then
	echo "Error: COOLIFY_UUID is empty"
	exit 1
fi

echo "Updating Coolify environment variables for UUID: $COOLIFY_UUID"
echo "Using environment file: $ENV_FILE"

ENV_VARS="["
FIRST=true

while IFS='=' read -r key value || [ -n "$key" ]; do
	if [[ -z "$key" || "$key" =~ ^[[:space:]]*# ]]; then
		continue
	fi

	key=$(echo "$key" | xargs)
	value=$(echo "$value" | xargs)

	if [[ -z "$key" ]]; then
		continue
	fi

	value="${value#\"}"
	value="${value%\"}"
	value="${value#\'}"
	value="${value%\'}"

	value=$(echo "$value" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g' | sed 's/\r/\\r/g' | sed 's/\t/\\t/g')

	if [ "$FIRST" = true ]; then
		FIRST=false
	else
		ENV_VARS+=","
	fi

	ENV_VARS+="{\"key\":\"$key\",\"value\":\"$value\",\"is_preview\":false,\"is_literal\":true,\"is_multiline\":false,\"is_shown_once\":true}"

done <"$ENV_FILE"

ENV_VARS+="]"

echo "Prepared environment variables JSON (keys only):"
echo "$ENV_VARS" | jq -r '.[].key' 2>/dev/null || echo "jq not available, skipping preview"

echo "$ENV_VARS"

RESPONSE=$(curl -s -w "\nHTTPSTATUS:%{http_code}" \
	-X PATCH \
	-H "Authorization: Bearer $COOLIFY_PAT" \
	-H "Content-Type: application/json" \
	-d "{\"data\":$ENV_VARS}" \
	"https://coolify.tahmid.io/api/v1/applications/$COOLIFY_UUID/envs/bulk")

HTTP_BODY=$(echo "$RESPONSE" | sed -e 's/HTTPSTATUS:.*//g')
HTTP_STATUS=$(echo "$RESPONSE" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')

echo "Response status: $HTTP_STATUS"

if [ "$HTTP_STATUS" -lt 200 ] || [ "$HTTP_STATUS" -ge 300 ]; then
	echo "Error: Failed to update environment variables"
	echo "Response body: $HTTP_BODY"
	exit 1
fi

echo "Successfully updated environment variables in Coolify"
echo "Response: $HTTP_BODY"
