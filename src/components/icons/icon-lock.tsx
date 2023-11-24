import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconLock = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      viewBox="0 0 24 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={24} height={45} rx={9} fill="#323232" />
      <path
        d="M14.8535 10V7C14.8535 5.15905 13.5104 4 11.8535 4C10.9289 4 10.1019 4.36098 9.55162 5C9.30907 5.2817 9.12022 5.6174 9.00047 6M7 10H17C17.5523 10 18 10.4477 18 11V18C18 18.5523 17.5523 19 17 19H7C6.44772 19 6 18.5523 6 18V11C6 10.4477 6.44772 10 7 10Z"
        stroke="#9463FE"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 35L12 28L19 35" stroke="#9463FE" strokeLinecap="round" />
    </svg>
  );
});
