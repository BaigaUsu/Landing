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
    assignees: taskAssigneesShort[];
    action_date: string;
    action_time: string;
    status: string;
    created_at: string;
    updated_at: string;
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
    assignees: taskAssigneesShort[];
    status: string;
    next_tasks: TaskShort [];
    previous_tasks: TaskShort[];
    application: ApplicationShort | null;
    project: ProjectShort | null;
    created_at: string;
    updated_at: string;
}

export interface TaskCreateRequest {
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    action: string;
    action_date: string | null;
    action_time: string | null;
    assignees: number[];
    previous_task: number | null;
    application: number | null;
    project: number | null;
}

export interface TaskUpdateRequest {
    name?: string;
    surname?: string;
    email?: string;
    phone_number?: string;
    action?: string | null;
    action_date?: string | null; 
    action_time?: string | null; 
    assignees?: taskAssigneesShort[];
    status?: string;
}

export interface taskAssigneesShort {
    id: number;
    name: string;
    surname: string;
}