"use client";
import React from "react";
import Timeline from "./Timeline";
import { PlaybackControls } from "./PlaybackControls";

export default function MainContent() {
  return (
    <section className="flex flex-col flex-1 max-sm:w-full h-screen">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-base font-semibold text-white">Audalign Project</h1>
        <button className="p-3 text-base font-semibold text-black bg-lime-300 rounded-lg cursor-pointer">
          Export
        </button>
      </header>

      {/* Main Content takes more height */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="mx-auto my-10 bg-gray-500 flex-grow h-[65vh] w-[880px] max-md:w-full max-md:h-auto">
          {/* Video Placeholder */}
          <img src="" alt="Video preview" className="object-cover size-full" />
        </div>
      </div>

      {/* Controls Container */}
      <div className="flex flex-col flex-none">
        <PlaybackControls />
        <Timeline />
      </div>
    </section>
  );
}
