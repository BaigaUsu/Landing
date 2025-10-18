import { Specialization } from "./specializationTypes";
import { StageShort } from "./stages/stageShortTypes";

export interface Staff {
    id: number;
    name: string;
    surname: string;
    email: string;
    specialization: Specialization[];
    is_active: boolean;
    is_superuser: boolean;
    is_staff: boolean;
    stages: StageShort[]
    created_at: string;
    updated_at: string;
}

export interface StaffRequest {      
    name: string;
    surname: string;
    email: string;
    specialization: number[];
    is_active?: boolean;
    is_superuser?: boolean;
    is_staff?: boolean;
}