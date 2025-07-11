import { Injectable } from '@nestjs/common';
import { ClassReqI, ClassResI } from '../shares';

@Injectable()
export class ClassService {
  private classes: ClassResI[] = [];

  private getNextId(): number {
    if (this.classes.length === 0) return 1;
    const maxId: number = Math.max(...this.classes.map((c: ClassResI) => c.id));
    return maxId + 1;
  }

  get(): ClassResI[] {
    return this.classes;
  }

  create(newClass: ClassReqI): ClassResI {
    const id: number = this.getNextId();
    const newClassRes: ClassResI = {
      ...newClass,
      id,
    };
    this.classes.push(newClassRes);
    return newClassRes;
  }

  update(id: string, curClass: ClassReqI): ClassResI {
    const numericId: number = Number(id); // id is changed to string, must be converted back to number
    const index: number = this.classes.findIndex(
      (c: ClassResI) => c.id === numericId,
    );
    if (index === -1) {
      throw new Error('Class with the given id does not exist');
    }
    const curClassRes: ClassResI = { ...curClass, id: numericId };
    this.classes[index] = curClassRes;
    return curClassRes;
  }

  delete(id: string): { msg: string } {
    const numericId: number = Number(id); // id is changed to string, must be converted back to number
    const index: number = this.classes.findIndex(
      (c: ClassResI) => c.id === numericId,
    );
    if (index === -1) {
      throw new Error('Class with the given id does not exist');
    }
    this.classes.splice(index, 1);
    return { msg: 'Class deleted successfully' };
  }
}
