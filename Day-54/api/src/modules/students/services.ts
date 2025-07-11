import { Injectable } from '@nestjs/common';
import { StudentReqI, StudentResI } from '../shares';

@Injectable()
export class StudentService {
  private students: StudentResI[] = [];

  private getNextId(): number {
    if (this.students.length === 0) return 1;
    const maxId: number = Math.max(
      ...this.students.map((s: StudentResI) => s.id),
    );
    return maxId + 1;
  }

  get(): StudentResI[] {
    return this.students;
  }

  create(newStudent: StudentReqI): StudentResI {
    const id: number = this.getNextId();
    const newStudentRes: StudentResI = {
      ...newStudent,
      id,
    };
    this.students.push(newStudentRes);
    return newStudentRes;
  }

  update(id: string, curStudent: StudentReqI): StudentResI {
    const numericId: number = Number(id); // id is changed to string, must be converted back to number
    const index: number = this.students.findIndex(
      (s: StudentResI) => s.id === numericId,
    );
    if (index === -1) {
      throw new Error('Student with the given id does not exist');
    }
    const curStudentRes: StudentResI = { ...curStudent, id: numericId };
    this.students[index] = curStudentRes;
    return curStudentRes;
  }

  delete(id: string): { msg: string } {
    const numericId: number = Number(id); // id is changed to string, must be converted back to number
    const index: number = this.students.findIndex(
      (s: StudentResI) => s.id === numericId,
    );
    if (index === -1) {
      throw new Error('Student with the given id does not exist');
    }
    this.students.splice(index, 1);
    return { msg: 'Student deleted successfully' };
  }
}
