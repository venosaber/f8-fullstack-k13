import { AvataI, StudentReqI, StudentResI } from '../shares';
export declare class Avata implements AvataI {
    id: number | null;
    url: string;
    payload: string;
}
export declare class StudentReq implements StudentReqI {
    name: string;
    email: string;
    school: string;
    parent_name: string;
    parent_phone: string;
    avata: Avata;
}
export declare class StudentRes implements StudentResI {
    id: number;
    name: string;
    email: string;
    school: string;
    parent_name: string;
    parent_phone: string;
    avata: Avata;
}
