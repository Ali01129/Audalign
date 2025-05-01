import React from "react";
import TabGroup from "./TabGroup";
import Slider from "./Slider";
import useGlobalStore from "../../zustand/store";
import axios from "axios";

const tabs = [
  { id: "all", label: "All", isActive: true },
  { id: "videos", label: "Videos" },
  { id: "audio", label: "Audio" },
];

export default function AudioControls() {
  const { volume, setVolume, reverb, setReverb, pitch, setPitch, noise, setNoise,navPressed,videoName,audio,setAudio,video,setVideo,revertVideo } = useGlobalStore();

  const controls = [
    { id: "volume", label: "Volume", value: volume, setValue: setVolume },
    { id: "reverb", label: "Reverb", value: reverb, setValue: setReverb },
    { id: "pitch", label: "Pitch", value: pitch, setValue: setPitch },
    { id: "noise", label: "Noise reduction", value: noise, setValue: setNoise },
  ];

  //handle audio upload
  const handleUploadAudio = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.mp3, .wav'; // only accept mp3 and wav files
    input.style.display = 'none';
  
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // setAudio(URL.createObjectURL(file));
        setAudio(file);
        console.log('Selected audio file:', file.name);
        // You can upload the file here using FormData or other methods
      }
    };
  
    document.body.appendChild(input);
    input.click();
  
    // Clean up the input after use
    input.remove();
  };


  //calling custom audio api
  const sendAudio = async () => {
    if (!video || !audio) {
      alert("Video or audio file is missing");
      return;
    }
  
    const formData = new FormData();
    formData.append("video", video);
    formData.append("audio", audio);
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/uploadWithAudio",
        formData,
        {
          responseType: "blob",
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
  
      const videoBlob = new Blob([response.data], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);
  
      setVideo(videoUrl);
  
      // Reload the page after a short delay to ensure state is updated
      setTimeout(() => {
        window.location.reload();
      }, 500);
  
    } catch (error) {
      if (error.response?.data) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const err = JSON.parse(reader.result);
            alert(`Error: ${err.error}`);
          } catch {
            alert("Error parsing server response.");
          }
        };
        reader.readAsText(error.response.data);
      } else {
        alert("Upload failed: " + error.message);
      }
    }
  };  

  const Revert = () => {
    setVideo(revertVideo);
    setVolume(50);
    setReverb(50);
    setPitch(50);
    setNoise(50);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  
  //calling slider api
  const handleSubmitSliders=async () => {
    if (!video) {
      alert("Video or audio file is missing");
      return;
    }
    const formData = new FormData();
    formData.append("video", video);
    formData.append("volume", volume);
    formData.append("pitch", pitch);
    formData.append("reverb", reverb);
    formData.append("noise_reduction", noise);
    try {
      const response = await axios.post("http://127.0.0.1:5000/augmentSound", formData, {
        responseType: "blob",
        headers: { "Content-Type": "multipart/form-data" }
      });

      // const videoBlob = new Blob([response.data], { type: "video/mp4" });
      // const videoURL = URL.createObjectURL(videoBlob);
      const videoURL = URL.createObjectURL(response.data);
      setVideo(videoURL);

      // Delay reload to allow React to render updated state
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 1 second delay
    } catch (error) {
      if (error.response && error.response.data) {
        const reader = new FileReader();
        reader.onload = () => {
          const err = JSON.parse(reader.result);
          alert(`Error: ${err.error}`);
        };
        reader.readAsText(error.response.data);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <section className="flex flex-col p-4 bg-zinc-700 w-[300px] max-sm:hidden max-sm:absolute max-sm:w-full max-sm:z-[1]">
      {/* Show "Import Media" button when navPressed is "Media" or "Audio" */}
      {(navPressed === "Media") && (
        <div className="w-full">
        <button
          className={`w-full p-3 mb-4 text-base font-semibold text-center rounded-lg cursor-pointer 
            ${videoName ? "bg-lime-200 text-gray-500 cursor-not-allowed" : "bg-lime-300 text-black"}`}
          disabled={!!videoName}
        >
          Import Media
        </button>
        <h4 className="text-base font-semibold text-white">{videoName}</h4>
      </div>
          
      )}

      {navPressed === "Audio" && (
        <div>
          <button
            className="w-full p-3 mb-4 text-base font-semibold text-center text-black bg-lime-300 rounded-lg cursor-pointer"
            onClick={handleUploadAudio}
          >
            Import Audio
          </button>

          {audio && (
            <>
              <h4 className="text-base font-semibold text-white">{audio.name}</h4>
              <button
                className="w-full p-3 mb-4 mt-4 text-base font-semibold text-center text-black bg-lime-300 rounded-lg cursor-pointer"
                onClick={sendAudio}
              >
                Apply
              </button>
            </>
          )}
        </div>
      )}


      {/* Show Audio Controls when navPressed is "Transition" */}
      {navPressed === "Controls" && (
        <>
          <button className="p-3 mb-4 text-base font-semibold text-center text-black bg-lime-300 rounded-lg w-fit ml-auto" onClick={Revert}>
            Revert to Original
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

          <button className="p-3 mt-8 text-base font-semibold text-center text-black bg-lime-300 rounded-lg cursor-pointer" onClick={handleSubmitSliders}>
            Apply
          </button>
        </>
      )}
    </section>
  );
}
