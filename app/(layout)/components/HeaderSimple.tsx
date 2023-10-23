"use client";
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Menu,
  Space,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import { IconAdjustments } from "@tabler/icons-react";
import Link from "next/link";
import { use, useContext, useEffect, useState } from "react";

import { ColorToggle } from "./ColorToggle";
import classes from "./HeaderSimple.module.css";
import { RTL } from "./RTL";

// import main context
import { BuzzContext } from "@/lib/BuzzContext";

const links = [
  { link: "/", label: "Home" },
  { link: "/pricing", label: "Pricing" },
  { link: "/test", label: "Test" },
];

export function HeaderSimple() {
  const { user } = useContext(BuzzContext);
  const { loggedIn, username, email, _id } = user;

  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);


  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={`${classes.link}`}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  const mobile_items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={`${classes.link} text-center text-xl font-bold`}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        setActive(link.link);
        toggle();
      }}
    >
      {link.label}
    </Link>
  ));

  const Login = (length: any) => (
    <Link href={loggedIn ? "/dashboard" : "/login"} className="no-underline">
      <Button
        fullWidth={length === "mobile" ? false : true}
        variant="outline"
        color="gray"
        size="sm"
        radius="md"
      >
        {loggedIn ? "Dashboard" : "Login"} 
      </Button>
    </Link>
  );

  const Adjustments = () => (
    <Menu position="bottom-end" offset={9} withArrow arrowPosition="center">
      <Menu.Target>
        <ActionIcon
          variant="outline"
          radius="md"
          aria-label="Settings"
          size="lg"
        >
          <IconAdjustments
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <div className="p-1 flex gap-2">
          <RTL />
          <ColorToggle />
        </div>
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <MantineLogo size={28} />
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>
          <div className="items-center gap-3 hidden xs:flex">
            <Login />
            <Adjustments />
          </div>
          <Box className="flex flex-row-reverse gap-3" hiddenFrom="xs">
            <Box hiddenFrom="xs">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="xs"
                size="sm"
              />
            </Box>
            <Adjustments />
          </Box>
        </Container>
      </header>
      <Drawer
        className="mt-[56px] xs:hidden "
        opened={opened}
        onClose={toggle}
        withCloseButton={false}
        position="right"
        size="100%"
      >
        <div className="flex flex-col mt-[rem(56px)] w-full">
          {mobile_items}
          <Space h="lg" />
          <Divider />
          <Login length="mobile" />
        </div>
      </Drawer>
    </>
  );
}
