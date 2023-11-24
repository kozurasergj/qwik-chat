import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconRecord = component$(
  (props: QwikIntrinsicElements["svg"]) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="7"
        viewBox="0 0 6 7"
        fill="none"
        {...props}
      >
        <circle cx="3" cy="3.66345" r="3" fill="#D03715" />
      </svg>
    );
  },
);
