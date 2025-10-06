import { ApplicationShort } from "@/share/types/applications/appShortTypes";
import { Stage, StageList } from "@/features/stages/types/stagesTypes";
import { TaskShort } from "@/share/types/tasks/taskShortTypes";

export interface Project<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}
export interface ProjectList {
    id: number;
    project_name: string;
    client: string;
    description: string;
    start_date: string;
    end_date: string;
    cost: string;
    status: "in progress" | "completed" | "pending" | string;
    comment: string;
}

  export interface ProjectId {
    id: number;
    project_name: string;
    client: string;
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
    stages: StageList[];
}

export interface ProjectPostRequest {
    project_name: string;
    client: number;
    description: string;
    start_date: string;
    end_date: string;
    cost: number;
    application?: number | null;
    tasks?: TaskShort[];
};

export interface ProjectUpdateRequest {
    project_name?: string;
    client?: number | null;
    description?: string;
    start_date?: string;
    end_date?: string;
    cost?: number;
    status?: string;
    comment?: string;
    tasks?: TaskShort[];
}