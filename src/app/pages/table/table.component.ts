import {Component, OnDestroy, OnInit} from "@angular/core";
import {StudentService} from "../../services/student.service";
import {Subscription} from "rxjs";
import {StudentModel} from "../../model/student.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, OnDestroy {
  constructor(private studentService: StudentService) {
  }

  test: any;
  allAddedStudents: StudentModel[] = [];

  private subscription!: Subscription;


  ngOnInit() {
    this.subscription = this.studentService.tasksChangedSubject
      .subscribe(
        (students: StudentModel[]) => {
          this.allAddedStudents = students;
        }
      );
    this.studentService.initStudents();
  }

  onDelete(guid: string){
    this.studentService.removeStudent(guid);
  }

  onEdit(guid: string){
    this.studentService.startedEditing.next(guid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
