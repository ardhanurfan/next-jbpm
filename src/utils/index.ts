const localhost = "http://localhost";
const username = "jack";
const password = "jack";
const credentials = `${username}:${password}`;
const encodedCredentials = btoa(credentials); // Encoding kredensial ke Base64

export async function fetchTaskInstances() {
  // Set the required headers for the API request
  const response = await fetch(
    `${localhost}/kie-server/services/rest/server/queries/tasks/instances/owners?status=Created&status=Ready&status=Reserved&status=InProgress&status=Suspended&status=Completed&status=Failed&status=Error&status=Exited&status=Obsolete&page=0&pageSize=10&sortOrder=true`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  if (response.ok) {
    return result;
  }

  throw result;
}

export async function startTaskInstance(
  containerId: string,
  taskInstanceId: number
) {
  const response = await fetch(
    `${localhost}/kie-server/services/rest/server/containers/${containerId}/tasks/${taskInstanceId}/states/started`,
    {
      method: "PUT",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (response.ok) {
    return "Task instance started successfully";
  }

  throw "Error starting task instance";
}

export async function submitForm(
  containerId: string,
  taskInstanceId: number,
  name: string
) {
  const response = await fetch(
    `${localhost}/kie-server/services/rest/server/containers/${containerId}/tasks/${taskInstanceId}/states/completed`,
    {
      method: "PUT",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: name }),
    }
  );

  if (response.ok) {
    return "Task instance started successfully";
  }

  throw "Error starting task instance";
}

export async function startNewProcessInstance(
  containerId: string,
  processId: string,
  name: string
) {
  const response = await fetch(
    `${localhost}/kie-server/services/rest/server/containers/${containerId}/processes/${processId}/instances`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: name }),
    }
  );

  if (response.ok) {
    return "Process instance created successfully";
  }

  throw "Error created instance";
}

export async function fetchDefinitions() {
  // Set the required headers for the API request
  const response = await fetch(
    `${localhost}/kie-server/services/rest/server/queries/processes/definitions?page=0&pageSize=10&sortOrder=true`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  if (response.ok) {
    return result;
  }

  throw result;
}

export async function fetchTaskDetail(
  containerId: string,
  taskInstanceId: number
) {
  // Set the required headers for the API request
  const response = await fetch(
    `${localhost}/kie-server/services/rest/server/containers/${containerId}/tasks/${taskInstanceId}?withInputData=true&withOutputData=true&withAssignments=true`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  if (response.ok) {
    return result;
  }

  throw result;
}
