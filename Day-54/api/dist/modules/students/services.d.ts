import { StudentReqI, StudentResI } from '../shares';
export declare class StudentService {
    private students;
    private getNextId;
    get(): StudentResI[];
    create(newStudent: StudentReqI): StudentResI;
    update(id: string, curStudent: StudentReqI): StudentResI;
    delete(id: string): {
        msg: string;
    };
}
