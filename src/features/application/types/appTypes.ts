import { ProjectShort } from "../../project/types/projectTypes";
import { TaskShort } from "./taskType";

export interface Application {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  status: string;
  created_at: string;
  updated_at: string;
  tasks: TaskShort[];
  project: ProjectShort | null;
}

export interface ApplicationShort {
  id: number;
  created_at: string;
}

export interface ApplicationRequest {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
}