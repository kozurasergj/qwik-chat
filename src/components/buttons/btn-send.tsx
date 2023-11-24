import { component$ } from "@builder.io/qwik";
import { IconSend } from "../icons";

interface BtnOpenWindowProps {
  disabled?: boolean;
}

export const BtnSend = component$<BtnOpenWindowProps>(({ disabled }) => {
  return (
    <button
      type="submit"
      class="flex-center h-full max-h-12 w-9 rounded-[10px] bg-[#9463FE]"
      disabled={disabled}
    >
      <div
        class={[
          "h-4 w-3 text-white transition-all",
          { "-rotate-90": !disabled },
        ]}
      >
        <IconSend />
      </div>
    </button>
  );
});
