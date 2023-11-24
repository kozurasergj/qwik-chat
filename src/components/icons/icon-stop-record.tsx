import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconStopRecord = component$(
  (props: QwikIntrinsicElements["svg"]) => {
    return (
      <svg
        viewBox="0 0 24 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect width={24} height={24} rx={9} fill="#323232" />
        <path
          d="M17 6H7C6.44772 6 6 6.59695 6 7.33333V16.6667C6 17.403 6.44772 18 7 18H17C17.5523 18 18 17.403 18 16.6667V7.33333C18 6.59695 17.5523 6 17 6Z"
          fill="#9463FE"
          stroke="#9463FE"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);
