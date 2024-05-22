"use client";

import { fetchDefinitions, startNewProcessInstance } from "@/utils";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [processDefinitions, setProcessDefinitions] = useState<
    ProcessDefinition[]
  >([]);
  const [isStart, setIsStart] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    getProcessDefinitions();
  }, []);

  const getProcessDefinitions = async () => {
    const data = await fetchDefinitions();
    setProcessDefinitions(data["processes"]);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    containerId: string,
    processId: string
  ) => {
    e.preventDefault();
    await startNewProcessInstance(containerId, processId, name);
    await getProcessDefinitions();
    setIsStart(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-8 py-20 bg-gradient-to-br from-blue-400 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-8">jBPM Integration Test</h1>
      {processDefinitions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {processDefinitions.map((definition) => (
            <div
              key={definition["process-id"]}
              className="bg-gray-800 text-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-4">
                Process Name: {definition["process-name"]}
              </h2>
              <p>
                <span className="font-semibold">Process ID:</span>{" "}
                {definition["process-id"]}
              </p>
              <p>
                <span className="font-semibold">Container ID:</span>{" "}
                {definition["container-id"]}
              </p>
              <p>
                <span className="font-semibold">Process Version:</span>{" "}
                {definition["process-version"]}
              </p>
              <p>
                <span className="font-semibold">Package:</span>{" "}
                {definition.package}
              </p>
              <p>
                <span className="font-semibold">Dynamic:</span>{" "}
                {definition.dynamic}
              </p>
              {definition["process-id"] == "BMI.BMI" ? (
                <form
                  onSubmit={(e) =>
                    handleSubmit(
                      e,
                      definition["container-id"],
                      definition["process-id"]
                    )
                  }
                >
                  <button
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Start
                  </button>
                </form>
              ) : (
                !isStart && (
                  <button
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsStart(true)}
                  >
                    Start
                  </button>
                )
              )}
              {isStart && definition["process-id"] != "BMI.BMI" && (
                <form
                  className="mt-4"
                  onSubmit={(e) =>
                    handleSubmit(
                      e,
                      definition["container-id"],
                      definition["process-id"]
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
                    className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-300"
                  />
                  <button
                    type="submit"
                    className="mt-4 mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setIsStart(false)}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancle
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg">No task instances found</p>
      )}
    </main>
  );
}
