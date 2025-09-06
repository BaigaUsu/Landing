import { ApplicationShort } from "@/share/types/applications/appShortTypes";
import { TaskShort } from "@/share/types/tasks/taskShortTypes";
import { ProjectShort } from "@/share/types/projects/projectShortTypes";

export interface Task<T>{
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface TaskList {
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
}

export interface TaskId {
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

export interface TaskCreateRequest {
    name?: string;
    surname?: string;
    email?: string;
    phone_number?: string;
    action?: string | null;
    action_date?: string | null;
    action_time?: string | null;
    previous_task?: number | null;
    application?: number | null;
}

export interface TaskUpdateRequest {
    name?: string;
    surname?: string;
    email?: string;
    phone_number?: string;
    action?: string | null;
    action_date?: string | null; 
    action_time?: string | null; 
    status?: string;
}