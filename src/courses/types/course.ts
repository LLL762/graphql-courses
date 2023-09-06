import { Degree } from "./degree";
import { Student } from "./student";
import { Teacher } from "./teacher";

export interface Course {
    id: number,
    name: string,
    description?: string,
    teacher?: Teacher,
    students?: Student[],
    degree?: Degree
}