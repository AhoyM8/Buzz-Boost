import {
  TextInput,
  PasswordInput,
  Paper, 
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import classes from "./Register.module.css";
import Link from "next/link";


// create a function that fecth data from the backend on ./api/route and return it
function getData() {
  return fetch("/api/route").then((res) => res.json());
}


export function Register() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Register
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        For privacy reasons, we only ask for email address and password.
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="John Doe" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Button fullWidth mt="xl"
        onClick={() => {
          getData().then((data) => console.log(data));
        }
      }
        >
          Register
        </Button>
      </Paper>
    </Container>
  );
}
