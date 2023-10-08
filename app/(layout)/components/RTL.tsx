import { ActionIcon, useDirection } from "@mantine/core";
import {
  IconTextDirectionLtr,
  IconTextDirectionRtl,
} from "@tabler/icons-react";

export function RTL() {
  const { toggleDirection, dir } = useDirection();
  return (
    <ActionIcon
      onClick={() => toggleDirection()}
      variant="default"
      radius="md"
      size="md"
    >
      {dir === "rtl" ? (
        <IconTextDirectionLtr stroke={1.5} />
      ) : (
        <IconTextDirectionRtl stroke={1.5} />
      )}
    </ActionIcon>
  );
}
