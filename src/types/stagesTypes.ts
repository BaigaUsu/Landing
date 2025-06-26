import { SubStage } from "./subStagesTypes";

export interface Stage {
    id: number;
    type: string; // "pre-project", "conceptual design", ...
    task: string;
    specialization: string;
    worker: {
      id: number;
      name: string;
      surname: string;
    };
    start_date: string;
    end_date: string;
    piece_rate_pay: string;
    status: string;
    comment: string;
    created_at: string;
    updated_at: string;
    substages: SubStage[];
  }

  export interface StageRequest {
    project: number;
    task: string;
    specialization: number;
    worker: number;
    start_date: string;
    end_date: string;
    piece_rate_pay: string;
  }