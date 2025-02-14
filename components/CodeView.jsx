"use client";
import Lookup from "@/data/Lookup";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { useState } from "react";

const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  return (
    <div>
      <div className="bg-[#181818] w-full p-2 border rounded-sm">
        <div className="flex items-center flex-wrap shrink-0 justify-center rounded-full bg-black p-1 w-[150px] gap-3">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${
              activeTab == "code" &&
              "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${
              activeTab == "preview" &&
              "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider files={files} options={{externalResources:['https://cdn.tailwindcss.com']}} template="react" theme={"dark"} customSetup={{ dependencies:{...Lookup.DEPENDANCY }} }>
        <SandpackLayout className="bg-gray-900 shadow-lg">
          {activeTab == "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "73.1vh" }} />
              <SandpackCodeEditor style={{ height: "73.1vh" }} />
            </>
          ) : (
            <>
              <SandpackPreview style={{ height: "73.1vh" }} showNavigator={true} />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
