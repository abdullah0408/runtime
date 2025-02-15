"use client";
import Lookup from "@/data/Lookup";
import React, { useState, useContext } from "react";
import { MessagesContext } from "@/context/MessagesContext";
import { ArrowRight, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import createWorkspace from "@/queries/createWorkspace";

const Hero = () => {
  const [input, setInput] = useState("");
  const { messages, setMessages } = useContext(MessagesContext);
  const router = useRouter();

  const onGenerate = async (input) => {
    setMessages({
      role: "user",
      content: input,
    });
    const workspace = await createWorkspace([{ role: "user", content: input }]);
    console.log(workspace);
    router.push(`/workspace/${workspace.id}`);
  };

  return (
    <div className="flex flex-col mt-28 items-center justify-center gap-6 text-center px-4">
      <h2 className="font-bold text-5xl text-white">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium max-w-2xl">{Lookup.HERO_DESC}</p>
      <div className="p-4 border border-gray-700 rounded-2xl max-w-2xl w-full shadow-lg bg-gray-800">
        <div className="flex gap-2 items-start">
          <textarea
            onChange={(e) => setInput(e.target.value)}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-gray-300 p-2 placeholder-gray-500"
          />
          {input && (
            <ArrowRight
              onClick={() => onGenerate(input)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 h-10 w-10 rounded-lg cursor-pointer transition-all"
            />
          )}
        </div>
        <div className="mt-2">
          <Link className="text-blue-400 hover:text-blue-300 transition-all" />
        </div>
      </div>
      <div className="flex flex-wrap max-w-2xl items-center justify-center gap-3">
        {Lookup.SUGGSTIONS.map((sugg) => (
          <h2
            onClick={() => onGenerate(sugg)}
            key={sugg}
            className="text-blue-400 cursor-pointer p-2 px-4 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all"
          >
            {sugg}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default Hero;
