import type { QRL } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { ArrowDown } from "../icons";

interface Props {
  scrollToDown: QRL<() => void>;
}

export const BtnScrollDown = component$<Props>(({ scrollToDown }) => {
  return (
    <button class="h-11 w-11" onClick$={scrollToDown}>
      <ArrowDown />
    </button>
  );
});
