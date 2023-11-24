import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

import type { PropFunction, Signal } from "@builder.io/qwik";
import type { APRecordingStatus } from "~/types/audio-processor-types";
import { IconMicrophone } from "../icons";

type MediaButtonProps = {
  statusRecording: Signal<APRecordingStatus>;
  startRecording: PropFunction<() => void>;
  stopRecording: PropFunction<() => void>;
};

export const BtnMicrophone = component$<MediaButtonProps>((props) => {
  const { statusRecording, startRecording, stopRecording } = props;

  const draggableRef = useSignal<HTMLElement>();
  const dragStatus = useSignal("");

  useVisibleTask$(({ cleanup }) => {
    if (draggableRef.value) {
      const dragstart = () => {
        dragStatus.value = "dragstart";
        console.log("dragstart");
      };
      const dragend = () => {
        dragStatus.value = "dragend";
        console.log("dragend");
      };

      draggableRef.value!.addEventListener("dragstart", dragstart);
      draggableRef.value!.addEventListener("dragend", dragend);
      cleanup(() => {
        draggableRef.value!.removeEventListener("dragstart", dragstart);
        draggableRef.value!.removeEventListener("dragend", dragend);
      });
    }
  });

  const handlePlayPause = $(() => {
    if (
      statusRecording.value === "ready" ||
      statusRecording.value === "stopped"
    ) {
      startRecording();
    } else if (statusRecording.value === "recording") {
      stopRecording();
    }
  });

  return (
    <div
      class="absolute bottom-0 right-0 z-[3] h-[60px] w-[60px] rounded-full shadow-lg"
      draggable
      ref={draggableRef}
      // onDragStart$={ action1 }
      // onDragEnd$={ action2 }
    >
      <button
        disabled={statusRecording.value === "denied"}
        onClick$={handlePlayPause}
        onKeyPress$={(e) => console.log(e)}
        class="flex-center  h-full w-full rounded-full shadow-inner"
      >
        <IconMicrophone />
      </button>
    </div>
  );
});
