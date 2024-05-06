"use client";

import { fetchTaskInstances } from "@/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [taskInstances, setTaskInstances] = useState<TaskInstance[]>([]);

  useEffect(() => {
    getTaskInstances();
  }, []);

  const getTaskInstances = async () => {
    const data = await fetchTaskInstances();
    setTaskInstances(data["task-summary"]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-br from-blue-400 to-indigo-600 text-white">
      <h1 className="text-3xl font-bold mb-8">jBPM Integration Test</h1>
      {taskInstances.length > 0 ? (
        <div className="grid grid-cols-4 gap-2">
          {taskInstances.map((taskInstance) => (
            <div
              key={taskInstance["task-id"]}
              className="bg-gray-800 text-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold">
                Task Name: {taskInstance["task-name"]}
              </h2>
              <p className="text-gray-400">
                Task Description: {taskInstance["task-description"]}
              </p>
              <p className="text-gray-400">
                Assigned To: {taskInstance["task-actual-owner"]}
              </p>
              <p className="text-gray-400">
                Status: {taskInstance["task-status"]}
              </p>
              <p className="text-gray-400">
                Correlation Key: {taskInstance["correlation-key"]}
              </p>
              <p className="text-gray-400">
                Process Type: {taskInstance["process-type"]}
              </p>
              <p className="text-gray-400">
                Task Container ID: {taskInstance["task-container-id"]}
              </p>
              <p className="text-gray-400">
                Task Created By: {taskInstance["task-created-by"]}
              </p>
              <p className="text-gray-400">
                Task Expiration Time:
                {taskInstance["task-expiration-time"]?.toDateString()}
              </p>
              <p className="text-gray-400">
                Task ID: {taskInstance["task-id"]}
              </p>
              <p className="text-gray-400">
                Task Is Skipable:{" "}
                {taskInstance["task-is-skipable"] ? "Yes" : "No"}
              </p>
              <p className="text-gray-400">
                Task Parent ID: {taskInstance["task-parent-id"]}
              </p>
              <p className="text-gray-400">
                Task Priority: {taskInstance["task-priority"]}
              </p>
              <p className="text-gray-400">
                Task Proc Definition ID: {taskInstance["task-proc-def-id"]}
              </p>
              <p className="text-gray-400">
                Task Proc Instance ID: {taskInstance["task-proc-inst-id"]}
              </p>
              <p className="text-gray-400">
                Task Subject: {taskInstance["task-subject"]}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg">No task instances found</p>
      )}
    </main>
  );
}
