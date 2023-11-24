import { component$ } from "@builder.io/qwik";
import { IconClip } from "../icons";

interface Props {}

export const BtnAddDocument = component$<Props>(() => {
  return (
    <button disabled class="h-6 w-6">
      <IconClip />
    </button>
  );
});
