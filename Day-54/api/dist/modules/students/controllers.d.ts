import { StudentService } from './services';
import { StudentReq, StudentRes } from './dtos';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    get(): StudentRes[];
    create(newStudent: StudentReq): StudentRes;
    update(id: string, curStudent: StudentReq): StudentRes;
    delete(id: string): {
        msg: string;
    };
}
