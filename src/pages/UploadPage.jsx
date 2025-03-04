import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import MenuButton from '../components/MenuButton';

const UploadPage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState("Click here to upload or drop media here");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setFile(file.name);
      setVideoFile(URL.createObjectURL(file));
    } else {
      setFile("Click here to upload or drop media here");
      alert("Please select a valid video file");
    }
  };

  const handleUpload = () => {
    if (videoFile) {
      navigate("/Result", { state: { videoFile } });
    } else {
      alert("Please upload a video before proceeding");
    }
  };

  return (
    <div className="h-screen bg-black relative flex flex-col">
      <div className='p-10'>
        <MenuButton />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-[90%] max-w-4xl bg-[#0A192F] rounded-lg p-6">
          <h1 className="text-white text-xl font-semibold mb-3">Upload a Video</h1>

          {/* Upload Area */}
          <div className="border-dashed border-2 border-gray-500 bg-white rounded-lg p-6 text-center h-64">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="video/mp4,video/mkv,video/webm" // Allow more video formats
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center h-full space-y-2"
            >
              <div className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16.707 10.707a1 1 0 01-1.414 0L11 6.414V16a1 1 0 11-2 0V6.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 010 1.414z" />
                </svg>
              </div>
              <p className="text-sm text-gray-800">{file}</p>
            </label>
          </div>

          {/* Navigation Buttons */}
          <div className="bg-white rounded-lg mt-4 p-3 text-center">
            <div className="flex justify-between">
              {/* Previous Button */}
              <button 
                className="bg-[#D0FF71] text-black px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#D0FF20] active:scale-95 transition-transform duration-150"
                onClick={() => {navigate('/')}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                <span>Previous</span>
              </button>

              {/* Next Button */}
              <button 
                className="bg-[#D0FF71] text-black px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#D0FF20] active:scale-95 transition-transform duration-150"
                onClick={handleUpload}
              >
                <span>Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
