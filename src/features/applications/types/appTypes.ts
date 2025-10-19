import { ProjectShort } from "../../../share/types/projects/projectShortTypes";
import { TaskShort } from "../../../share/types/tasks/taskShortTypes";

export interface Application<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}
export interface ApplicationList {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    status: string;
    created_at: string;
    updated_at: string;
    project: ProjectShort;
}

export interface ApplicationId {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    status: string;
    created_at: string;
    updated_at: string;
    tasks: TaskShort[];
    project: ProjectShort;
}

export interface ApplicationPatchRequest {
    name?: string;
    surname?: string;
    email?: string;
    phone_number?: string;
    status?: string;
}