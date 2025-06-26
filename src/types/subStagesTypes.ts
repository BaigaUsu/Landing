export interface SubStage {
    id: number;
    stage: {
      id: number;
      type: string;
      task: string;
      status: string;
    };
    task: string;
    start_date: string;
    end_date: string;
    status: string;
    comment: string;
    created_at: string;
    updated_at: string;
  }

  export interface SubStageRequest {
    stage: number;
    task: string;
    start_date: string;
    end_date: string;
  }