import { ApplicationShort } from "./appTypes";
import { Stage } from "./stagesTypes";
import { TaskShort } from "./taskType";

export interface ProjectShort {
  id: number;
  project_name?: string;
  start_date?: string;
  end_date?: string;
  cost?: string;
  status?: string;
}

export interface Project {
  id: number;
  project_name: string;
  client: number; // ID клиента
  description: string;
  start_date: string;
  end_date: string;
  cost: string;
  status: string;
  comment: string;
  created_at: string;
  updated_at: string;
  application: ApplicationShort | null;
  tasks: TaskShort[];
  stages: Stage[];
}

export interface ProjectRequest {
  project_name: string;
  client: number;
  description: string;
  start_date: string;
  end_date: string;
  cost: string;
  status: string;
  application: number | null;
}