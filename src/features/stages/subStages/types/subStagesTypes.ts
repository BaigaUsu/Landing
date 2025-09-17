export interface SubStage<T> {
    count: number;
    next: T | null;
    previous: T | null;
    results: T[];
  }

export interface SubStageList {
    id: number;
    title: string;
    task: string;
    start_date: string;
    end_date: string;
    status: string;
    comment: string;
    created_at: string;
    updated_at: string;
}

export interface SubStageId {
    id: number;
    title: string;
    task: string;
    start_date: string;
    end_date: string;
    status: string;
    comment: string;
    created_at: string;
    updated_at: string;
}

export interface SubStageRequest {
    title: string;
    task: string;
    start_date: string | null;
    end_date: string | null;
}