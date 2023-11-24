import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const ArrowLeft = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="icons/ExpandDown">
        <path
          id="Icon"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.9577 4.70339C13.6107 4.35636 13.0481 4.35636 12.701 4.70339L7.36928 10.0351C7.02225 10.3822 7.02225 10.9448 7.36928 11.2918L12.701 16.6236C13.0481 16.9706 13.6107 16.9706 13.9577 16.6236C14.3048 16.2766 14.3048 15.7139 13.9577 15.3669L9.25434 10.6635L13.9577 5.96009C14.3048 5.61306 14.3048 5.05042 13.9577 4.70339Z"
          fill="#656565"
        />
      </g>
    </svg>
  );
});
