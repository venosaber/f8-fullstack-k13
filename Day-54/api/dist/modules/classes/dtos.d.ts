import { ClassReqI, ClassResI } from '../shares';
export declare class ClassReq implements ClassReqI {
    name: string;
    code: string;
    users: number[];
}
export declare class ClassRes implements ClassResI {
    id: number;
    name: string;
    code: string;
    users: number[];
}
