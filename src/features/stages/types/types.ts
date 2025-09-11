export type StageWithType = {
    id: number;
    type: string;
    projectId: number;
};

export type ServerStageType = 
    | "pre-project"
    | "conceptual design" 
    | "detailed design"
    | "material specification"
    | "author's supervisor";

export type ServerStageUrlKind =
    | "pre-projects"
    | "conceptual-designs"
    | "detailed-designs"
    | "material-specifications"
    | "authors-supervisors";

export type SpecializationKey = 
    | "designer"
    | "manager"
    | "visualizer"
    | "complectator"
    | "architect";