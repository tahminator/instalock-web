CREATE OR REPLACE FUNCTION "updateNewUserMatches"(puuid text)
RETURNS void AS $$
BEGIN
    PERFORM pg_notify(
        'updateNewUserMatchesChannel',
        puuid
    );
END;
$$ LANGUAGE plpgsql;
