"use client";
import { useContext, useEffect, useState } from "react";
import Lookup from "@/data/Lookup";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import updateCode from "@/queries/updateCode";
import { useParams } from "next/navigation";
import { getWorkspace } from "@/queries/getWorkspace";
import { Loader2Icon } from "lucide-react";

const CodeView = () => {
  const params = useParams();
  const workspaceId = params?.workspaceId;
  const { messages } = useContext(MessagesContext);
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchFiles() {
      if (!workspaceId) return;
      try {
        const files = await getWorkspace(workspaceId);
        const mergedFiles = { ...Lookup.DEFAULT_FILE, ...files?.fileData };
        setFiles(mergedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    }
    fetchFiles();
  }, [workspaceId]);

  const generateAICode = async () => {
    if (messages.length === 0 || isFetching) return;

    setIsFetching(true);
    
    const prompt = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT +
      " and don't use src folder." + " Use only these dependencies not any other then these : " +
      JSON.stringify({
        "postcss": "^8",
        "tailwindcss": "^3.4.1",
        "autoprefixer": "^10.0.0",
        "tailwind-merge": "^2.4.0",
        "tailwindcss-animate": "^1.0.7",
        "lucide-react": "^0.469.0",
        "react-router-dom": "^7.1.1",
        "firebase": "^11.1.0",
        "@google/generative-ai": "^0.21.0",
        "date-fns": "^4.1.0",
        "react-chartjs-2": "^5.3.0",
        "chart.js": "^4.4.7",
      });

    try {
      const result = await axios.post("/api/generate-ai-code", { prompt });
      const AIResponse = result.data;
      const mergedFiles = { ...Lookup.DEFAULT_FILE, ...AIResponse?.files };
      setFiles(mergedFiles);
      await updateCode(workspaceId, AIResponse?.files);
    } catch (error) {
      console.error("AI Code generation failed:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "user" && !isFetching) {
      generateAICode();
    }
  }, [messages]);

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border rounded-sm">
        <div className="flex items-center flex-wrap shrink-0 justify-center rounded-full bg-black p-1 w-[150px] gap-3">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${
              activeTab === "code" && "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${
              activeTab === "preview" && "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Preview
          </h2>
        </div>
      </div>

      <SandpackProvider
        files={files}
        options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
        template="react"
        theme={"dark"}
        customSetup={{ dependencies: { ...Lookup.DEPENDANCY } }}
      >
        <SandpackLayout className="bg-gray-900 shadow-lg">
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "73.1vh" }} />
              <SandpackCodeEditor style={{ height: "73.1vh" }} />
            </>
          ) : (
            <SandpackPreview style={{ height: "73.1vh" }} showNavigator={true} />
          )}
        </SandpackLayout>
      </SandpackProvider>

      {isFetching && (
        <div className="p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white ml-3">Generating your files...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;