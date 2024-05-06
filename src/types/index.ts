interface TaskInstance {
  "correlation-key": string;
  "process-type": number;
  "task-actual-owner": string;
  "task-container-id": string;
  "task-created-by": string | null;
  "task-description": string;
  "task-expiration-time": Date | null;
  "task-id": number;
  "task-is-skipable": boolean;
  "task-name": string;
  "task-parent-id": number;
  "task-priority": number;
  "task-proc-def-id": string;
  "task-proc-inst-id": number;
  "task-status": string;
  "task-subject": string;
}
