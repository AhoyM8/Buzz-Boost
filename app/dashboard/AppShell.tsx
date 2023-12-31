"use client";
import { BuzzContext } from "@/lib/BuzzContext";
import { AppShell, Burger, Divider, Group, ScrollArea } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import {
  IconReceipt,
  IconSettings,
  IconThumbUp
} from "@tabler/icons-react";
import { useContext, useState } from "react";

import { UserButton } from "./components/UserButton/UserButton";
import { StartBuzz } from "./tabs/start/StartBuzz";

export default function Page() {
  const { user } = useContext(BuzzContext);
  const { loggedIn, username, email, _id } = user;

  const [opened, { toggle }] = useDisclosure();

  const [active, setActive] = useState("Start Buzz");
  const [activeTab, setActiveTab] = useState(<StartBuzz />);

  // const links = data.map((item) => (
  //   <a
  //     className={classes.link}
  //     data-active={item.label === active || undefined}
  //     href={item.link}
  //     key={item.label}
  //     onClick={(event) => {
  //       // event.preventDefault();
  //       setActive(item.label);
  //     }}
  //   >
  //     <item.icon className={classes.linkIcon} stroke={1.5} />
  //     <span>{item.label}</span>
  //   </a>
  // ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <MantineLogo size={30} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {/* <AppShell.Section>Navbar header</AppShell.Section> */}
        Current Balance: $0.00
        <AppShell.Section grow my="md" component={ScrollArea}>
          {/* {links} */}
        </AppShell.Section>
        <AppShell.Section>
          {/* Navbar footer – always at the bottom */}
          <Divider my="sm" />

          <UserButton />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <StartBuzz />
      </AppShell.Main>
    </AppShell>
  );
}

const data = [
  {
    link: "/dashboard/start",
    label: "Start Buzz",
    icon: IconThumbUp,
    page: <StartBuzz />,
  },
  { link: "", label: "Orders", icon: IconReceipt },
  // { link: "", label: "Security", icon: IconFingerprint },
  // { link: "", label: "SSH Keys", icon: IconKey },
  // { link: "", label: "Databases", icon: IconDatabaseImport },
  // { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "Settings", icon: IconSettings },
];
