import { ClassReqI, ClassResI } from '../shares';
export declare class ClassService {
    private classes;
    private getNextId;
    get(): ClassResI[];
    create(newClass: ClassReqI): ClassResI;
    update(id: string, curClass: ClassReqI): ClassResI;
    delete(id: string): {
        msg: string;
    };
}
