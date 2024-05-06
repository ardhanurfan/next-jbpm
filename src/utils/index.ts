const localhost = "http://localhost";

export async function fetchTaskInstances() {
  // Set the required headers for the API request
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  const username = "wbadmin";
  const password = "wbadmin";
  const credentials = `${username}:${password}`;
  const encodedCredentials = btoa(credentials); // Encoding kredensial ke Base64

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

  return result;
  // throw result;
}
