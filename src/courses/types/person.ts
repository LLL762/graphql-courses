import { DegreeInfos } from "./degreeInfos";

export interface Person {
    id: number,
    firstName: string,
    lastName: string,
    email?: string,
    degrees?: DegreeInfos[]
}