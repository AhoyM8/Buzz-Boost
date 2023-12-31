"use client";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import classes from "./Register.module.css";
import { useState } from "react";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Register
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        For privacy reasons, we only ask for email address and password.
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="John Doe"
          required
          onInput={(event) => setEmail(event.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onInput={(event) => setPassword(event.currentTarget.value)}
        />
        <Button fullWidth mt="xl" onClick={() => RegisterUser(email, password)}>
          Register
        </Button>
      </Paper>
    </Container>
  );
}

async function RegisterUser(email: string, password: string) {
  // const username to be the part before the @ in the email
  const username = email.split("@")[0];
  fetch("/register/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        window.location.href = "/";
      } else {
        alert(data.error);
      }
    });
}
