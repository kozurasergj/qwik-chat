import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import type { QwikKeyboardEvent } from "@builder.io/qwik";

import { BtnAddDocument, BtnSend } from "../buttons";

export const TextBlock = component$<TMessageBlock>(
  ({ sendMessage, isFetching }) => {
    const ref = useSignal<HTMLTextAreaElement>();
    const inputtedText = useSignal<string>();

    const handleSubmit = $(() => {
      inputtedText.value?.trim() && sendMessage(inputtedText.value);
      inputtedText.value = undefined;
    });

    const handleKeyDown = $((e: QwikKeyboardEvent<HTMLFormElement>) => {
      if (e.ctrlKey && e.key === "Enter") {
        handleSubmit();
      }
    });

    useVisibleTask$(({ track }) => {
      track(() => inputtedText.value);

      if (!ref.value) return;

      const height = ref.value.scrollHeight;

      if (height > 26 && height < 30) return;

      if (!inputtedText.value) {
        ref.value.style.height = "28px";
        return;
      }

      ref.value.style.height = height > 140 ? "140px" : height + "px";
    });

    useVisibleTask$(({ track }) => {
      track(() => isFetching.value);
      if (ref.value && !isFetching.value) {
        ref.value.focus();
      }
    });

    return (
      <form
        preventdefault:submit
        class="flex items-end justify-between gap-3 px-3 py-[6px]"
        onSubmit$={handleSubmit}
        onKeyDown$={handleKeyDown}
      >
        <div class="h-6 w-6 shrink-0">
          <BtnAddDocument />
        </div>

        <textarea
          ref={ref}
          autoComplete="off"
          class={[
            "h-7 w-full grow resize-none overflow-hidden rounded-[10px] bg-[#171717] caret-[#9463FE]",
            "px-[10px] py-1 text-sm font-extralight text-[#DEDEDE] outline-none transition-all",
          ]}
          placeholder={isFetching.value ? "Wait for the AI reply" : "Сообщение"}
          bind:value={inputtedText}
          disabled={isFetching.value}
        />

        <div class="shrink-0 self-stretch flex items-end">
          <BtnSend disabled={!inputtedText.value?.trim() || isFetching.value} />
        </div>
      </form>
    );
  },
);
