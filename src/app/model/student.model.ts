import { v4 as uuidv4 } from 'uuid';


export class StudentModel {
  guid = uuidv4();
  firstName: string;
  lastName: string;
  studentClass: string;
  studentMark: number;

  constructor(firstName: string, lastName: string, studentClass: string, studentMark: number) {
     this.firstName = firstName;
     this.lastName = lastName;
     this.studentClass = studentClass;
     this.studentMark = studentMark;
  }
}
