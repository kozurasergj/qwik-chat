import { type Signal, component$, useSignal, $ } from "@builder.io/qwik";
import * as icons from "../icons";
import { useClickOutside } from "~/hooks/use-click-outside";

export const languages = [
  {
    value: "en_GB",
    name: "English",
    icon: <icons.FlagGB />,
  },
  {
    value: "es_ES",
    name: "Spanish",
    icon: <icons.FlagES />,
  },
  {
    value: "sv_SE",
    name: "Swedish",
    icon: <icons.FlagSE />,
  },
  {
    value: "uk_UA",
    name: "Ukrainian",
    icon: <icons.FlagUA />,
  },
  {
    value: "nl_NL",
    name: "Dutch",
    icon: <icons.FlagNL />,
  },
  {
    value: "da_DK",
    name: "Danish",
    icon: <icons.FlagDK />,
  },
  {
    value: "de_DE",
    name: "German",
    icon: <icons.FlagDE />,
  },
  {
    value: "pl_PL",
    name: "Polish",
    icon: <icons.FlagPL />,
  },
  {
    value: "ru_RU",
    name: "Russian",
    icon: <icons.FlagRU />,
  },
];

interface BtnLanguageProps {
  isWindowOpened: Signal<boolean>;
  currentLang: Signal<TLangCode>;
  class?: string;
}

export const BtnLanguage = component$<BtnLanguageProps>(
  ({ currentLang, class: appendClass, isWindowOpened }) => {
    const showDropdown = useSignal(false);
    const ref = useSignal<HTMLDivElement>();

    useClickOutside(
      ref,
      $(() => (showDropdown.value = false)),
    );

    const onClick = $(() => {
      if (!isWindowOpened.value && !showDropdown.value) {
        isWindowOpened.value = showDropdown.value = true;
      } else {
        showDropdown.value = !showDropdown.value;
      }
    });

    return (
      <div
        ref={ref}
        class={[
          "rounded-full border bg-neutral-900",
          { "-left-[6px] -top-2": showDropdown.value },
          appendClass,
        ]}
      >
        <button
          onClick$={onClick}
          class={[
            "flex-center flex-col gap-[6px] rounded-full",
            { "mx-[6px] my-2": showDropdown.value },
          ]}
        >
          <div
            class={[
              "flex-center h-9 w-9",
              { "rounded-full border": showDropdown.value },
            ]}
          >
            <div
              class={`h-8 w-8 overflow-hidden rounded-full outline outline-1`}
            >
              {languages.find((item) => item.value === currentLang.value)!.icon}
            </div>
          </div>

          {showDropdown.value &&
            languages
              .filter((item) => item.value !== currentLang.value)
              .map((item) => (
                <div
                  class="h-8 w-8 overflow-hidden rounded-full"
                  key={item.value}
                  onClick$={() => (currentLang.value = item.value as TLangCode)}
                >
                  {item.icon}
                </div>
              ))}
        </button>
      </div>
    );
  },
);
