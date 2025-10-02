export type Props =
    | {
        type: "form-task";
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
        type: "form-application";
        applicationId: number;
        applicationLabel: string;
        onSuccess?: () => void;
    };