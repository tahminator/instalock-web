import { Title, Text, Button, Container, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './FourOhFour.module.css';

export default function FourOhFour() {
  const navigate = useNavigate();
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Womp Womp.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={() => navigate('/')}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
