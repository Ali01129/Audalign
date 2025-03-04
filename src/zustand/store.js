import { create } from "zustand";

// Define the store
const useGlobalStore = create((set) => ({

  volume:50,
  reverb:50,
  pitch:50,
  noise:50,

  setVolume: (volume) => set({ volume }),
  setReverb: (reverb) => set({ reverb }),
  setPitch: (pitch) => set({ pitch }),
  setNoise: (noise) => set({ noise }),
}));

export default useGlobalStore;
