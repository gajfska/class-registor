import {Injectable} from "@angular/core";
import studentData from "../../assets/students.json"
import {StudentModel} from "../model/student.model";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class StudentService{

  tasksChangedSubject = new Subject<StudentModel[]>();
  startedEditing = new Subject<string>();

  private studentsArray: StudentModel[] = [];

    initStudents(): void {
      this.studentsArray = studentData;
      this.updateStudentsList();
    }

    updateStudentsList(): void {
      this.tasksChangedSubject.next(this.studentsArray);
    }

    addStudent(student: StudentModel) {
      this.studentsArray.push(student);
      this.updateStudentsList();
    }

    removeStudent(guid: string) {
      const removeIndex = this.studentsArray.map((item) => {
        return item.guid;
      }).indexOf(guid);
      this.studentsArray.splice(removeIndex, 1);
      this.updateStudentsList();
    }

    getStudent(guid: string) {
      return this.studentsArray.find(item => item.guid === guid)
    }

    updateStudent(guid: string, newStudent: StudentModel){
      let data: any = this.studentsArray.find(item => item.guid === guid);
      console.log(typeof data);
      data.firstName = newStudent.firstName;
      data.lastName = newStudent.lastName;
      data.studentClass = newStudent.studentClass;
      data.studentMark = newStudent.studentMark;

    }
}
