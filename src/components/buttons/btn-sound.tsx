import { component$, type Signal } from "@builder.io/qwik";
import { SoundOn, SoundOff } from "../icons";

interface BtnSoundProps {
  isAutoPlay: Signal<boolean>;
}

export const BtnSound = component$<BtnSoundProps>(({ isAutoPlay }) => {
  return (
    <button
      class="flex-center gradient-bd-white-bg-dark h-9 w-[84px] gap-2 rounded-full"
      onClick$={() => (isAutoPlay.value = !isAutoPlay.value)}
    >
      <div class="h-[22px] w-[22px] shrink-0">
        {isAutoPlay.value ? <SoundOn /> : <SoundOff />}
      </div>

      <span class="select-none text-sm uppercase leading-5 text-white">
        {isAutoPlay.value ? "ON" : "OFF"}
      </span>
    </button>
  );
});
