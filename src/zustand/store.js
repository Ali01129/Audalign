import { create } from "zustand";

// Define the store
const useGlobalStore = create((set) => ({

  volume:50,
  reverb:50,
  pitch:50,
  noise:50,
  navPressed:'Media',
  video:null,
  videoName:null,
  videoRef:null,
  loading:false,

  setVolume: (volume) => set({ volume }),
  setReverb: (reverb) => set({ reverb }),
  setPitch: (pitch) => set({ pitch }),
  setNoise: (noise) => set({ noise }),
  setNavPressed: (navPressed) => set({ navPressed }),
  setVideo: (video) => set({ video }),
  setVideoName: (videoName) => set({ videoName }),
  setVideoRef: (videoRef) => set({ videoRef }),
  setLoading: (loading) => set({ loading }),
}));

export default useGlobalStore;
