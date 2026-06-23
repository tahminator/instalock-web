import * as jose from "jose";

const fakeData = {
  entitlements: ["urn:entitlement:globalriot.merch.lorbetajacket"],
  at_hash: "v2afTr7s4HFq0q1pvUfsmD",
  sub: "ed62b133-a56a-5f5c-a704-7beb5da23e98",
  iss: "https://entitlements.auth.riotgames.com",
  iat: 1736695687,
  jti: "pZPe6oF_6yg",
};

const fakeSecretKey = new TextEncoder().encode("secret");

export const GET_ENTITLEMENT_FOUND = (async () => {
  return {
    entitlements_token: await new jose.SignJWT(fakeData)
      .setProtectedHeader({ alg: "HS256" })
      .sign(fakeSecretKey),
    errorCode: undefined,
  };
})();
