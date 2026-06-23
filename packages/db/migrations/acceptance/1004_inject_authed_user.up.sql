INSERT INTO public."User"
  (puuid, "riotTag", "riotAuth", "riotEntitlement", "newUser")
VALUES
  ('4f8b2c1d-9a3e-5b7f-8c4d-2e6a1b9d3c5e', 'secondaryacceptanceuser#scnd1', 'acceptance-auth-token', 'acceptance-entitlement-token', false),
  ('c9a3e5b7-f8c4-4d2e-6a1b-9d3c5e4f8b2c', 'throwawayacceptanceuser#thrw1', 'acceptance-auth-token', 'acceptance-entitlement-token', false);

INSERT INTO public."Session"
  ("id", "userId", "expiresAt")
VALUES
  ('acceptanceauthedsessionneverexpires00000', '4f8b2c1d-9a3e-5b7f-8c4d-2e6a1b9d3c5e', '9999-12-31 23:59:59'),
  ('acceptancelogoutsessionneverexpires00000', 'c9a3e5b7-f8c4-4d2e-6a1b-9d3c5e4f8b2c', '9999-12-31 23:59:59');
