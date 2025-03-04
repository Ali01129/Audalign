import React from "react";
import TabGroup from "./TabGroup";
import Slider from "./Slider";
import useGlobalStore from "../../zustand/store";

const tabs = [
  { id: "all", label: "All", isActive: true },
  { id: "videos", label: "Videos" },
  { id: "audio", label: "Audio" },
];

export default function AudioControls() {
  const { volume, setVolume, reverb, setReverb, pitch, setPitch, noise, setNoise } = useGlobalStore();

  const controls = [
    { id: "volume", label: "Volume", value: volume, setValue: setVolume },
    { id: "reverb", label: "Reverb", value: reverb, setValue: setReverb },
    { id: "pitch", label: "Pitch", value: pitch, setValue: setPitch },
    { id: "noise", label: "Noise reduction", value: noise, setValue: setNoise },
  ];

  return (
    <section className="flex flex-col p-4 bg-zinc-700 w-[300px] max-sm:hidden max-sm:absolute max-sm:w-full max-sm:z-[1]">
      <TabGroup tabs={tabs} />

      <button className="p-3 mb-4 text-base font-semibold text-center text-black bg-lime-300 rounded-lg cursor-pointer">
        Import Media
      </button>

      <button className="p-3 mb-4 text-base font-semibold text-center text-black bg-lime-300 rounded-lg w-fit ml-auto">
        Revert
      </button>

      <div className="flex flex-col gap-4">
        {controls.map((control) => (
          <div key={control.id}>
            <h3 className="mb-2 text-base font-semibold text-white">
              {control.label}
            </h3>
            <Slider value={control.value} setValue={control.setValue} />
          </div>
        ))}
      </div>

      <button className="p-3 mt-8 text-base font-semibold text-center text-black bg-lime-300 rounded-lg cursor-pointer">
        Apply
      </button>
    </section>
  );
}
