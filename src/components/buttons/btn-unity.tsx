import { component$ } from "@builder.io/qwik";
import { UnityButton } from "../../components/icons/unity-icon";
import "../../styles/animationStyle.css";

interface BtnUnityProps {}

export const BtnUnity = component$<BtnUnityProps>((props) => {
  {
    props;
  }

  return (
    <button class="unityImage mb-10 rounded-full">
      <UnityButton />
    </button>
  );
});
