import { Specialization } from "./specializationTypes";

export interface Me {
    id: number;
    name: string;
    surname: string;
    specializations: Specialization[];
}