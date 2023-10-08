"use client";
import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
// import image from './image.svg'; // hero_rocket_rise.svg in public/img
import image from "public/img/hero_rocket_rise.svg";
import classes from "./HeroBullets.module.css";

export function HeroBullets() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Buzz <span className={classes.highlight}>Boost</span> - Your Social
            Media Rocket
          </Title>
          <Text c="dimmed" mt="md">
            Catapult your online presence to new heights with ease. Buzz Boost
            provides a spectrum of social media enhancement services, tailored
            to propel your profiles forward.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Fast and Effective</b> – Experience noticeable growth swiftly
            </List.Item>
            <List.Item>
              <b>Free and open source</b> – Safety is our priority, seamless transactions every time
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b> – Buzz around with ease, our platform is a breeze to navigate
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
            Call to Action
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Boost Now
            </Button>
          </Group>
        </div>
        <Image src={image.src} className={classes.image} alt="Hero image" />
      </div>
    </Container>
  );
}
