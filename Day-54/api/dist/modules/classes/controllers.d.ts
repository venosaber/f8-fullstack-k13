import { ClassService } from './services';
import { ClassReq, ClassRes } from './dtos';
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    get(): ClassRes[];
    create(newClass: ClassReq): ClassRes;
    update(id: string, curClass: ClassReq): ClassRes;
    delete(id: string): {
        msg: string;
    };
}
