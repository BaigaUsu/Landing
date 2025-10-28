import { ApplicationId } from "@/features/applications/types/appTypes";
import { TaskId } from "@/features/tasks/types/taskType";

export type Props =
    | {
        type: "from-task";
        task: TaskId;
        previousTaskId: number;
        previousTaskLabel: string;
        applicationId?: number;
        applicationLabel?: string;
        projectId?: number;
        projectLabel?: string;
        onSuccess?: () => void;
    }
    | {
        type: "independent";
        onSuccess?: () => void;
    }
    | {
        type: "from-application";
        application: ApplicationId;
        applicationId: number;
        applicationLabel: string;
        onSuccess?: () => void;
    };