"use client";
import Armarios from "@/components/Armarios";
import Turmas from "@/components/Turmas";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState("armarios");

  return (
    <div className="min-h-screen px-8  font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center">
        <button
          className={`px-4 py-2 font-semibold border-2 rounded-l-full ${
            selected === "armarios"
              ? "text-white bg-blue-700 border-blue-700"
              : "text-blue-700 border-blue-700"
          }`}
          onClick={() => setSelected("armarios")}
        >
          Armários
        </button>
        <button
          className={`px-4 py-2 font-semibold border-2 rounded-r-full ${
            selected === "turmas"
              ? "text-white bg-blue-700 border-blue-700"
              : "text-blue-700 border-blue-700"
          }`}
          onClick={() => setSelected("turmas")}
        >
          Turmas
        </button>
      </div>
      <div className="mt-8">
        {selected === "armarios" ? <Armarios /> : <Turmas />}
      </div>
    </div>
  );
}
