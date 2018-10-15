import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Teacher } from '../models/teacher';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.css']
})
export class TeacherRegisterComponent implements OnInit {
  OnSubmit() {

    debugger;
    this.myTeacher.id=0;
    this.userService.addTeacher(this.myTeacher).subscribe((teacher: any) => alert("gkhgjhk")),
      (error: HttpErrorResponse) => alert(error.status + " " + error.statusText);
  }
  myTeacher: Teacher;
  constructor(public userService: UsersService) {
  this.myTeacher = new Teacher();


  }
  ngOnInit() {
  }

}
