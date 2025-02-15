import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getAllWorkspaces } from "@/queries/getAllWorkspaces";
import Link from "next/link";

const WorkspaceHistory = () => {
  const user = useUser();
  const [workspaces, setWorkspaces] = useState();
  useEffect(() => {
    if (user) {
      getAllWorkspaces().then((data) => {
        setWorkspaces(data);
      });
    }
  }, []);
  return (
    <div>
      <h2 className="font-medium text-lg">Your Chats</h2>
      <div>
        {workspaces &&
          workspaces.map((workspace) => (
            <Link key={workspace.id} href={"/workspace/" + workspace.id}>
              <h2 className="text-sm text-gray-400 mt-2 font-light cursor-pointer hover:text-white">
                {workspace?.messages[0]?.content}
              </h2>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default WorkspaceHistory;
