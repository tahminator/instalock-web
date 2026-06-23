DELETE FROM
  public."Session"
WHERE
  id IN (
    'acceptanceauthedsessionneverexpires00000',
    'acceptancelogoutsessionneverexpires00000'
  );

DELETE FROM
  public."User"
WHERE
  puuid IN (
    '4f8b2c1d-9a3e-5b7f-8c4d-2e6a1b9d3c5e',
    'c9a3e5b7-f8c4-4d2e-6a1b-9d3c5e4f8b2c'
  );
