import { ProjectShort } from "./projects/projectShortTypes";
import { Specialization } from "./specializationTypes";
import { StageShort } from "./stages/stageShortTypes";
import { TaskShort } from "./tasks/taskShortTypes";

export interface Staff<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}
export interface StaffList {
    id: number;
    name: string;
    surname: string;
    email: string;
    specialization: Specialization[];
    is_active: boolean;
    is_superuser: boolean;
    created_at: string;
    updated_at: string;
}

export interface StaffId {
    id: number;
    name: string;
    surname: string;
    email: string;
    specializations: Specialization[];
    phone_number: string;
    is_active: boolean;
    is_superuser: boolean;
    projects: ProjectShort[];
    stages: StageShort[];
    tasks: TaskShort[];
    created_at: string;
    updated_at: string;
}

export interface StaffCreateRequest {      
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    specializations: number[];
    is_superuser: boolean;
    password: string;
    confirm_password: string;
}

export interface StaffUpdateRequest {
    name?: string;
    surname?: string;
    email?: string;
    phone_number?: string;
    specializations?: number[];
    is_superuser?: boolean;
    password?: string;
    confirm_password?: string;
}

export interface StaffShort {
    id: number;
    name: string;
    surname: string;
}