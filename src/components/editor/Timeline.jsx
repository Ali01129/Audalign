import React from "react";

const TimelineMarker = ({ time }) => (
  <div className="text-xs text-gray-400">{time}</div>
);

const markers = [
  "0",
  "0:02",
  "0:04",
  "0:06",
  "0:08",
  "0:10",
  "0:12",
  "0:14",
  "0:16",
  "0:18",
  "0:20",
  "0:22",
];

export default function Timeline() {
  return (
    <section className="relative p-4 h-[150px] bg-black">
      <div className="flex justify-between mb-2">
        {markers.map((time, index) => (
          <TimelineMarker key={index} time={time} />
        ))}
      </div>

      <div className="relative h-px bg-gray-400" />
      <div className="text-sm text-gray-400">
        Drag & drop media here to start creating awesome videos.
      </div>
    </section>
  );
}