"use client";

import { useState, type FormEvent } from "react";
import { col } from "@/lib/style";

const tracks = [
  "Photography",
  "Videography",
  "Editing & post-production",
  "Livestream & broadcast",
  "Sound engineering",
  "Not sure yet",
];

const levels = [
  "Complete beginner",
  "Some self-taught practice",
  "Working, want to go professional",
];

export default function ApplyForm() {
  const [sent, setSent] = useState(false);

  // Local confirmation, as in the design. Wire to the Academy inbox when ready.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[320px] flex-col justify-center gap-[14px]">
        <div className="text-[clamp(24px,2.8vw,34px)] font-extrabold text-red-brand">
          Application received.
        </div>
        <p className="m-0 font-body text-[18px] leading-[1.55] text-mute-300">
          The Academy coordinator will contact you with next steps. Keep an eye
          on your email and phone.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 self-start border border-[#4a4a4a] bg-transparent px-[22px] py-3 font-body text-base text-white transition-colors hover:border-red-brand hover:text-red-brand"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="kicker text-red-brand">APPLICATION FORM</div>
      <div className="autofit gap-3" style={col("180px")}>
        <label className="field-label">
          FULL NAME
          <input name="name" required className="field" />
        </label>
        <label className="field-label">
          AGE
          <input name="age" className="field" />
        </label>
        <label className="field-label">
          EMAIL
          <input name="email" type="email" required className="field" />
        </label>
        <label className="field-label">
          PHONE
          <input name="phone" required className="field" />
        </label>
        <label className="field-label">
          LOCATION
          <input name="location" className="field" />
        </label>
        <label className="field-label">
          PREFERRED TRACK
          <select name="track" className="field">
            {tracks.map((track) => (
              <option key={track}>{track}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="field-label">
        EXPERIENCE SO FAR
        <select name="level" className="field">
          {levels.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>
      </label>
      <label className="field-label">
        WHY DO YOU WANT THIS TRAINING?
        <textarea name="why" rows={4} className="field resize-y" />
      </label>
      <label className="flex items-start gap-[10px] font-body text-[15px] text-mute-400">
        <input
          type="checkbox"
          name="scholarship"
          className="mt-1 h-[18px] w-[18px] accent-red-brand"
        />
        I would like to be considered for a sponsored or scholarship seat.
      </label>
      <button
        type="submit"
        className="btn btn-solid cursor-pointer border-none px-6 py-[17px] text-[18px]"
      >
        Submit application
      </button>
    </form>
  );
}
