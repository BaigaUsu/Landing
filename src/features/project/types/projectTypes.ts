import { ApplicationShort } from "../../application/types/appTypes";
import { Stage } from "../../stages/types/stagesTypes";
import { Client } from "../../../share/types/usersTypes";
import { TaskShort } from "@/features/task/types/taskType";

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
  client: Client;
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
  client: number | null;
  description?: string;
  start_date?: string | null;
  end_date?: string | null;
  cost?: number | null;
  status?: string | null;
  application?: number | null;
};