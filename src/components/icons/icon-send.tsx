import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconSend = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5 4.07813L7.83333 1.15625M7.83333 1.15625L4.16667 4.07812M7.83333 1.15625L7.83333 11.748C7.83333 12.3532 7.21775 12.8438 6.45833 12.8438L0.5 12.8437"
        stroke="currentColor"
      />
    </svg>
  );
});
