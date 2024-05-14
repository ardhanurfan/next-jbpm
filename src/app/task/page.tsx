"use client";

import {
  fetchTaskDetail,
  fetchTaskInstances,
  startTaskInstance,
  submitForm,
} from "@/utils";
import { FormEvent, useEffect, useState } from "react";

export default function Task() {
  const [taskInstances, setTaskInstances] = useState<TaskInstance[]>([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(0);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    getTaskInstances();
  }, []);

  const getTaskInstances = async () => {
    const data = await fetchTaskInstances();
    setTaskInstances(data["task-summary"]);
  };

  const getDetail = async (containerId: string, taskInstanceId: number) => {
    const data = await fetchTaskDetail(containerId, taskInstanceId);
    setTaskInput(data["task-input-data"]["newName"]);
    setSelected(taskInstanceId);
  };

  const handleStart = async (containerId: string, taskInstanceId: number) => {
    await startTaskInstance(containerId, taskInstanceId);
    await getTaskInstances();
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    containerId: string,
    taskInstanceId: number
  ) => {
    e.preventDefault();
    await submitForm(containerId, taskInstanceId, name);
    await getTaskInstances();
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-8 py-20 bg-gradient-to-br from-blue-400 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-8">jBPM Integration Test</h1>
      {taskInstances.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {taskInstances.map((taskInstance) => (
            <div
              key={taskInstance["task-id"]}
              className="bg-gray-800 text-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-4">
                Task Name: {taskInstance["task-name"]}
              </h2>
              <p>
                <span className="font-semibold">Correlation Key:</span>{" "}
                {taskInstance["correlation-key"]}
              </p>
              <p>
                <span className="font-semibold">Process Type:</span>{" "}
                {taskInstance["process-type"]}
              </p>
              <p>
                <span className="font-semibold">Actual Owner:</span>{" "}
                {taskInstance["task-actual-owner"]}
              </p>
              <p>
                <span className="font-semibold">Container ID:</span>{" "}
                {taskInstance["task-container-id"]}
              </p>
              <p>
                <span className="font-semibold">Created By:</span>{" "}
                {taskInstance["task-created-by"]}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {taskInstance["task-description"]}
              </p>
              <p>
                <span className="font-semibold">Expiration Time:</span>{" "}
                {taskInstance["task-expiration-time"]?.toString()}
              </p>
              <p>
                <span className="font-semibold">Task ID:</span>{" "}
                {taskInstance["task-id"]}
              </p>
              <p>
                <span className="font-semibold">Is Skipable:</span>{" "}
                {taskInstance["task-is-skipable"] ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">Parent ID:</span>{" "}
                {taskInstance["task-parent-id"]}
              </p>
              <p>
                <span className="font-semibold">Priority:</span>{" "}
                {taskInstance["task-priority"]}
              </p>
              <p>
                <span className="font-semibold">Proc Definition ID:</span>{" "}
                {taskInstance["task-proc-def-id"]}
              </p>
              <p>
                <span className="font-semibold">Proc Instance ID:</span>{" "}
                {taskInstance["task-proc-inst-id"]}
              </p>
              <p>
                <span className="font-semibold">Task Status:</span>{" "}
                {taskInstance["task-status"]}
              </p>
              <p>
                <span className="font-semibold">Task Subject:</span>{" "}
                {taskInstance["task-subject"]}
              </p>
              {selected == taskInstance["task-id"] && (
                <>
                  {taskInstance["task-status"] === "Reserved" && (
                    <button
                      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() =>
                        handleStart(
                          taskInstance["task-container-id"],
                          taskInstance["task-id"]
                        )
                      }
                    >
                      Start
                    </button>
                  )}
                  {taskInstance["task-status"] === "InProgress" && (
                    <form
                      className="mt-4"
                      onSubmit={(e) =>
                        handleSubmit(
                          e,
                          taskInstance["task-container-id"],
                          taskInstance["task-id"]
                        )
                      }
                    >
                      <label
                        htmlFor="name"
                        className="block text-gray-300 font-semibold"
                      >
                        Name:
                      </label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        defaultValue={taskInput}
                        className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-300"
                      />
                      <button
                        type="submit"
                        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </>
              )}
              <div className="flex justify-center">
                {selected != taskInstance["task-id"] ||
                taskInstance["task-status"] === "Completed" ? (
                  <button
                    disabled={taskInstance["task-status"] === "Completed"}
                    className="mt-4 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-500 disabled:hover:bg-slate-500"
                    onClick={() =>
                      getDetail(
                        taskInstance["task-container-id"],
                        taskInstance["task-id"]
                      )
                    }
                  >
                    Detail
                  </button>
                ) : (
                  <button
                    disabled={taskInstance["task-status"] === "Completed"}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-500 disabled:hover:bg-slate-500"
                    onClick={() => setSelected(0)}
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg">No task instances found</p>
      )}
    </main>
  );
}