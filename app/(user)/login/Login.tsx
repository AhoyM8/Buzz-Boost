"use client";
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import classes from "./Login.module.css";
import { useContext, useEffect, useState } from "react";

import { BuzzContext } from "@/lib/BuzzContext";

export function Login() {
  const { user } = useContext(BuzzContext);
  const { _id } = user;
 


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);


  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Link href="/register" className="no-underline">
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="John Doe"
          required
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          onClick={() => SignIn(email, password, rememberMe)}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

const SignIn = (email: string, password: string, rememberMe: boolean) =>
  fetch("/login/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, rememberMe }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        window.location.href = "/";
      }
    });
