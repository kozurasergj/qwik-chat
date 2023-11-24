import { component$,  useVisibleTask$ } from "@builder.io/qwik";
import { useAudioProcessor } from "~/hooks/use-audio-processor";

import { BtnMicrophone } from "../buttons";
import { ArrowLeft } from "../icons/arrow-left";
import { IconRecord } from "../icons/icon-record";

export const AudioBlock = component$<TMessageBlock>((props) => {
  const { isFetching, sendMessage } = props;
  const {
    startRecording,
    stopRecording,
    statusRecording,
    clearRecording,
    formattedDuration,
    base64AudioData,
    // analyser,
    // audioUrl
  } = useAudioProcessor({ enableAnalyser: false });

  // const ref = useSignal<HTMLAudioElement>()

  useVisibleTask$(({ track, cleanup }) => {
    const data = track(() => base64AudioData.value);
    data && sendMessage(data);

    // if (!data) return
    // ref.value?.src = data

    // console.log("audioBlob :>> ", data);

    cleanup(() => clearRecording());
  });

  return (
    <>
      <div class=" gradient-bd-white-bg-gray relative flex h-11 w-full grow resize-none items-center justify-between gap-3 rounded-[10px] border-none p-[10px] text-sm text-[#DEDEDE] outline-none transition-all">
        <div class="flex w-[56px] items-center gap-1">
          <IconRecord />

          <span class="text-sm leading-5 text-white">
            {formattedDuration.value}
          </span>
        </div>

        {/* <audio ref={ref} controls src={audioUrl.value}/> */}

        <div class="flex text-[#656565]">
          <ArrowLeft />
          <span>Влево-отмена</span>
        </div>

        <div class="flex">
          <BtnMicrophone
            {...{
              startRecording,
              stopRecording,
              statusRecording,
              isFetching,
            }}
          />
        </div>
      </div>
      {/* <MediaButton
        status={statusRecording}
        analyser={analyser}
        onStart={startRecording}
        onStop={stopRecording}
        formattedDuration={formattedDuration}
      /> */}
    </>
  );
});
