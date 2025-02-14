import ChatView from "@/components/ChatView";
import CodeView from "@/components/CodeView";
import React from "react";

const Workspace = () => {
  return (
    <div className="p-10 bg-gray-950 text-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ChatView />
        <div className="col-span-2">
          <CodeView />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
