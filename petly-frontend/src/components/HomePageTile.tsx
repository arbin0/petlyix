import { IconClipboardHeart, IconDogBowl, IconDeviceDesktopAnalytics, IconCalendarCheck } from '@tabler/icons-react';
import { Button, Grid, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import classes from '../styles/HomePageTile.module.css';

const features = [
{
    icon: IconDeviceDesktopAnalytics,
    title: 'Multi-Pet Dashboard',
    description:
      'Manage multiple pets with a unified dashboard — switch between profiles, compare health stats, and organize care with ease.',
  },
  {
    icon: IconCalendarCheck,
    title: 'Veterinary Records & Reminders',
    description: 'Store medical history, vaccination details, and set auto-reminders for checkups and medications.',
  },
  {
    icon: IconDogBowl,
    title: 'Pet Food Tracker',
    description: 'Log meals, monitor calorie intake, and get smart feeding suggestions based on breed, age, and activity level.',
  },
  {
    icon: IconClipboardHeart,
    title: 'Activity & Health Insights',
    description:
      'Track walks, playtime, weight, and mood trends — visualize your pet’s health with clean, insightful charts.',
  },
  
];

const HomePageTile: React.FC = () => {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <feature.icon size={26} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            Smart Pet Management - Everything Your Pet Deserves
          </Title>
          <Text c="dimmed">
            Whether you're caring for one pet or many, our system gives you complete control over nutrition, 
            medical history, daily routines, and more so you can focus on what really matters: spending time with your best friend.
          </Text>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
          >
            Get started
          </Button>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            {items}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default HomePageTile;