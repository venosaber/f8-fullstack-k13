"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
let StudentService = class StudentService {
    students = [];
    getNextId() {
        if (this.students.length === 0)
            return 1;
        const maxId = Math.max(...this.students.map((s) => s.id));
        return maxId + 1;
    }
    get() {
        return this.students;
    }
    create(newStudent) {
        const id = this.getNextId();
        const newStudentRes = {
            ...newStudent,
            id,
        };
        this.students.push(newStudentRes);
        return newStudentRes;
    }
    update(id, curStudent) {
        const numericId = Number(id);
        const index = this.students.findIndex((s) => s.id === numericId);
        if (index === -1) {
            throw new Error('Student with the given id does not exist');
        }
        const curStudentRes = { ...curStudent, id: numericId };
        this.students[index] = curStudentRes;
        return curStudentRes;
    }
    delete(id) {
        const numericId = Number(id);
        const index = this.students.findIndex((s) => s.id === numericId);
        if (index === -1) {
            throw new Error('Student with the given id does not exist');
        }
        this.students.splice(index, 1);
        return { msg: 'Student deleted successfully' };
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)()
], StudentService);
//# sourceMappingURL=services.js.map