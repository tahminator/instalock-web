import { Center, Container, Grid, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import CardComponent from '../CardComponent/CardComponent';
import InstalockCard from '../LiveMatch/InstalockCard';

export default function Matches({
  authToken,
  entitlementToken,
  count,
  matches,
  setMatches,
  setAuthenticated,
}: {
  authToken: string;
  entitlementToken: string;
  count: number;
  matches: Array<any>;
  setMatches: React.Dispatch<React.SetStateAction<never[]>>;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(100);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/riot/get/matches', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authToken, entitlementToken }),
        });

        if (!response.ok) {
          notifications.show({
            title: 'Failed to fetch matches',
            message: 'Please try again later',
            color: 'red',
          });
        }

        const data = await response.json();
        if (response.status === 200) {
          setMatches(data.data);
          notifications.show({
            title: 'Success',
            message: 'Matches have been fetched!',
            color: 'green',
          });
        } else {
          notifications.show({
            title: 'Failed to fetch matches',
            message: 'Please try again later',
            color: 'red',
          });
        }
      } catch (error) {
        notifications.show({
          title: `Failed to fetch matches: ${error}`,
          message: 'Please try again later',
          color: 'red',
        });
      }
      setIsLoading(false);
    }
    fetchMatches();
  }, [count]);

  return (
    <Container fluid>
      {isLoading ? (
        <Center h={58}>
          <Loader color="red.7" />
        </Center>
      ) : (
        <Grid>
          <Grid.Col span={{ xs: 12, sm: 3 }} key="livematch">
            <InstalockCard
              entitlementToken={entitlementToken}
              authToken={authToken}
              height={height}
              width={width}
              setAuthenticated={setAuthenticated}
            />
          </Grid.Col>
          {matches.map((match) => (
            <Grid.Col span={{ xs: 12, sm: 3 }} key={match.matchid}>
              <CardComponent
                src={`${match.mapcode}.png`}
                alt={`${match.realmapname}`}
                title={match.realmapname}
                time={match.date}
                duration={match.duration}
                completed={match.completed}
                realmapname={match.realmapname}
                gamemode={match.gamemode}
                players={match.players}
                me={match.me}
                setWidth={setWidth}
                setHeight={setHeight}
                description={
                  match.rrdiff > 0 ? `Gained ${match.rrdiff} RR` : `Lost ${-match.rrdiff} RR`
                }
                mesrc={`${match.me.charactertype}.png`}
                meagentname={match.me.charactername}
              />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  );
}
