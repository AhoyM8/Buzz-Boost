import {
  Text,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Anchor,
  Button,
  Container,
  Title,
} from "@mantine/core";
import classes from "../verify.module.css";

function Demo() {
  // get windows search query if any

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        {/* Account Verified! */}
        Account Verification Link Expired
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {/* Your account has been verified. You may continue as a verified user. */}
        Your account verification link has expired (links expire after 24
        hours). Please request a new link.
      </Text>
    </Container>
  );
}

export default Demo;
