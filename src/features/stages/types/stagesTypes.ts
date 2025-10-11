import { Staff } from "../../../share/types/staffTypes";
import { SubStageList } from "../subStages/types/subStagesTypes";

export interface Stage<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface StageList {
    id: number;
    kind: string;
    task: string;
    specialization: string;
    worker: Staff;
    start_date: string;
    end_date: string;
    piece_rate_pay: string;
    status: string;
    comment: string;
    created_at: string;
    updated_at: string;
}

export interface StageId {
    id: number;
    kind: string;
    task: string;
    specialization: string;
    worker: Staff;
    start_date: string;
    end_date: string;
    piece_rate_pay: string;
    status: string;
    comment: string;
    created_at: string;
    updated_at: string;
    substages: SubStageList[];
}

export interface StageCreateRequest {
    task: string;
    specialization: string;
    worker: number;
    start_date: string;
    end_date: string;
    piece_rate_pay: string;
}

export interface StageUpdateRequest {
    task: string;
    specialization: string;
    worker?: number | null;
    start_date: string;
    end_date: string;
    piece_rate_pay: string;
    status: string;
    comment?: string;
}

// export interface Labels {
//         id: number;
//         label: string;
// }