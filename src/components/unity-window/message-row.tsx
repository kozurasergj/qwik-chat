import { component$ } from "@builder.io/qwik";

import { AudioPlayer } from "../audio-player/audio-player";
import { IconCustomer } from "../icons";
import ImageUnity from "~/components/img/unity.png?jsx";

type Props = TMessage & { isAutoplay: boolean };

export const MessageRow = component$<Props>((props) => {
  const { from, content, base64AudioData, isAutoplay } = props;
  const isCustomer = from === "customer";

  return isCustomer ? (
    <div class="flex justify-end gap-2 text-sm text-[#DEDEDE] ">
      <div class="flex flex-col gap-2">
        <span>{content}</span>

        {base64AudioData && (
          <AudioPlayer {...{ isCustomer, base64AudioData }} />
        )}
      </div>

      <div class="h-6 w-6 shrink-0 rounded-full outline outline-1">
        <IconCustomer />
      </div>
    </div>
  ) : (
    <div class="flex gap-2 text-sm text-[#BD9FFE]">
      <ImageUnity class="row-span-2 h-6 w-6 shrink-0" />

      <div class="flex flex-col gap-2">
        <span>{content}</span>

        {base64AudioData && (
          <AudioPlayer {...{ isAutoplay, base64AudioData }} />
        )}
      </div>
    </div>
  );
});
