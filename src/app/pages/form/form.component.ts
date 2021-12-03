import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {StudentModel} from "../../model/student.model";
import {NgForm} from "@angular/forms";
import {StudentService} from "../../services/student.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('studentForm', { static: false }) studentForm!: NgForm;

  classes = ['IVa', 'IVb', 'IVc','Va', 'Vb', 'Vc'];
  editedStudent: any;
  private subscription!: Subscription;
  editMode = false;
  editedStudentGuid: any;

  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    this.subscription = this.studentService.startedEditing
      .subscribe( (guid: string) => {
        this.editedStudentGuid = guid;
        this.editMode = true;
        this.editedStudent = this.studentService.getStudent(guid);
        this.studentForm.setValue({
          firstName: this.editedStudent.firstName,
          lastName: this.editedStudent.lastName,
          studentClass: this.editedStudent.studentClass,
          studentMark: this.editedStudent.studentMark
        })
    })
  }

  onSubmit(form: NgForm): void {
    const newStudent = new StudentModel(form.value.firstName, form.value.lastName, form.value.studentClass, form.value.studentMark)
    if (this.editMode){
      this.studentService.updateStudent(this.editedStudentGuid, newStudent);
    } else {
      this.studentService.addStudent(newStudent);
    }
    form.resetForm();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
