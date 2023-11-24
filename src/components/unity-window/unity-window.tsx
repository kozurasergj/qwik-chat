import type { QwikUIEvent } from "@builder.io/qwik";
import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import {
  speechToSpeechApi,
  speechToTextApi,
  textToSpeechApi,
  textToTextApi,
} from "~/utils/api";

import { AudioBlock } from "../audio-block";
import * as btns from "../buttons";
import * as icons from "../icons";
import { MessageRow } from "./message-row";
import { TextBlock } from "./text-block";
import { BtnScrollDown } from "../buttons/btn-scroll-down";

export default component$(() => {
  const messages = useStore<{ data: TMessage[] }>({ data: [] });
  const chatRef = useSignal<Element>();
  const isAutoPlay = useSignal(false);
  const isWindowOpened = useSignal(true);
  const isFetching = useSignal(false);
  const currentLang = useSignal<TLangCode>("en_GB");
  const showToDownBtn = useSignal(false);

  const sendTextMessage = $(async (message: string) => {
    isFetching.value = true;
    const toFetchData = {
      content: message,
      language_code: currentLang.value,
    };

    messages.data.push({ from: "customer", content: message });

    const [resTextMessage, resBase64AudioData] = await Promise.all([
      textToTextApi(toFetchData),
      textToSpeechApi(toFetchData),
    ]);

    const messageData: TMessage = {
      from: "unity",
      content: resTextMessage
        ? resTextMessage.content
        : "Something's gone wrong ...",
      base64AudioData: resBase64AudioData && resBase64AudioData.content,
    };

    messages.data.push(messageData);

    isFetching.value = false;
  });

  const sendAudioMessage = $(async (base64AudioData: string) => {
    isFetching.value = true;
    const toFetchData = {
      content: base64AudioData,
      language_code: currentLang.value,
    };

    const [resTextMessage, resBase64AudioData] = await Promise.all([
      speechToTextApi(toFetchData),
      speechToSpeechApi(toFetchData),
    ]);

    const messageData: TMessage = {
      from: "customer",
      content: resTextMessage
        ? resTextMessage.content
        : "Something's gone wrong ...",
      base64AudioData: resBase64AudioData && resBase64AudioData.content,
    };

    messages.data.push(messageData);

    isFetching.value = false;
  });

  const scrollToDown = $(() => {
    chatRef.value?.scrollTo({
      top: chatRef.value.scrollHeight,
      behavior: "smooth",
    });
  });

  const handleChatScroll = $(
    (_: QwikUIEvent<HTMLDivElement>, el: HTMLDivElement) => {
      showToDownBtn.value = el.scrollTop <= 100;
    },
  );

  useVisibleTask$(({ track }) => {
    track(() => messages.data.length);
    scrollToDown();
  });

  return (
    <main class="relative flex h-screen w-screen items-center justify-center bg-neutral-700">
      <div
        class={[
          "gradient-bd-purple-bg-dark fixed bottom-2 left-1 right-1 max-w-screen-sm overflow-hidden rounded-3xl shadow-xl",
          "drop-shadow-lg transition-all duration-500 min-[478px]:bottom-[52px] min-[478px]:left-2 min-[478px]:right-2",
          "min-[528px]:left-auto min-[528px]:w-full md:bottom-[88px] md:right-[71px]",
          {
            "max-h-[calc(100%-16px)]": isWindowOpened.value,
            "max-h-[85px]": !isWindowOpened.value,
          },
        ]}
      >
        <div class="relative z-[2] mx-[5px] mt-[5px] flex h-20 items-center justify-evenly rounded-[calc(24px-1px)] bg-neutral-900 text-white">
          <btns.BtnSound isAutoPlay={isAutoPlay} />
          <btns.BtnUnity />

          <div class="relative h-9 w-[84px]">
            <btns.BtnLanguage
              class="absolute"
              currentLang={currentLang}
              isWindowOpened={isWindowOpened}
            />

            <btns.BtnOpenWindow
              class="absolute right-0"
              isWindowOpened={isWindowOpened}
            />
          </div>
        </div>

        <div class="flex h-[360px] flex-col justify-end gap-4  px-5 py-3 transition-all">
          <div
            onScroll$={handleChatScroll}
            ref={chatRef}
            class="h-full overflow-y-auto"
          >
            {messages.data.map((el, i) => (
              <MessageRow {...el} key={i} isAutoplay={isAutoPlay.value} />
            ))}
          </div>

          {showToDownBtn.value && <BtnScrollDown scrollToDown={scrollToDown} />}

          {isFetching.value && <icons.IconLoader />}
        </div>

        <div
          class={[
            "mx-3 mb-4 rounded-xl bg-[#323232] transition-all",
            {
              "visible opacity-100": isWindowOpened.value,
              "invisible opacity-0": !isWindowOpened.value,
            },
          ]}
        >
          <AudioBlock sendMessage={sendAudioMessage} isFetching={isFetching} />

          <TextBlock sendMessage={sendTextMessage} isFetching={isFetching} />
        </div>
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Welcome to ChatAI",
  meta: [
    {
      name: "description",
      content: "ChatAI description",
    },
  ],
};
