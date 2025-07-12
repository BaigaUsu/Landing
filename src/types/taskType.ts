import { ApplicationShort } from "./appTypes";
import { ProjectShort } from "./projectTypes";


export interface Task {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  action: string;
  action_date: string;
  action_time: string;
  status: string;
  next_task: TaskShort | null;
  previous_tasks: TaskShort[];
  application: ApplicationShort | null;
  project: ProjectShort | null;
}

export interface TaskShort {
  id: number;
  action: string;
  action_date: string;
  action_time: string;
  status: string;
}

export interface TaskRequest {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  action?: string | null;
  action_date?: string | null; // формат: YYYY-MM-DD
  action_time?: string | null; // формат: HH:MM:SS
  previous_task?: number | null;
  application?: number | null;
  project?: number | null;
}