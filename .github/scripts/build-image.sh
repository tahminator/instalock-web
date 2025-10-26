#!/usr/bin/env bash
set -euo pipefail

export TZ="America/New_York"

TIMESTAMP="$(date +%Y.%m.%d-%H.%M.%S)"
GIT_SHA="$(git rev-parse --short HEAD)"
TAG_PREFIX="${TAG_PREFIX:-}"
TYPE="${TYPE:-"web"}"
TAGS=(
	"tahminator/instalock-${TYPE}:${TAG_PREFIX}latest"
	"tahminator/instalock-${TYPE}:${TAG_PREFIX}${TIMESTAMP}"
	"tahminator/instalock-${TYPE}:${TAG_PREFIX}${GIT_SHA}"
)

echo "Building image with tags:"
printf '  - %s\n' "${TAGS[@]}"

[ -n "${DOCKER_HUB_PAT:-}" ] && echo "DOCKER_HUB_PAT found" || echo "DOCKER_HUB_PAT missing or empty"

echo "${DOCKER_HUB_PAT}" | docker login -u "tahminator" --password-stdin

docker buildx create --use --name codebloom-builder || docker buildx use codebloom-builder

if [[ "${DOCKER_UPLOAD:-true}" == "true" ]]; then
	BUILD_MODE="--push"
else
	BUILD_MODE="--load"
fi

docker buildx build \
	$BUILD_MODE \
	--file infra/${DOCKER_FILE_NAME:-"Dockerfile.web"} \
	$(printf -- '--tag %s ' "${TAGS[@]}") \
	.

echo "Image pushed successfully."
