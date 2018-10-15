import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UsersService } from '../users.service';
import { Pupils } from '../models/pupils';
import { Teacher } from '../models/teacher';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  d: number;
  password:any;
  userName:any;
  
  saveTimeOfLesson(){
    this.userService.rrrrrr().subscribe(
      (error: HttpErrorResponse) => alert(error.status + " " + error.statusText));

  }
  login() {
    debugger;


    this.userService.GetAllPupils(this.userName, this.password).subscribe((sc: number) => {
      if (sc ==1) {
        sessionStorage.setItem("teacherPassword", this.password);
      }
      if (sc ==2) {
        sessionStorage.setItem("pupilPassword", this.password);
      }
            this.router.navigate(['/schedule-teacher', this.password]);
    },
      (error: HttpErrorResponse) => alert(error.status + " " + error.statusText));

    {

    }
  }

pupilRegister(){
  this.router.navigate(['/pupil-register']);
}

teacherRegister(){
  this.router.navigate(['/teacher-register']);
}
  myPupil: Pupils;
  myTeacher: Teacher;
  pupils: any;
  s: any;
  constructor(public userService: UsersService, private router: Router) {
    this.myPupil = new Pupils();
  }

  ngOnInit(){
    this.id01.nativeElement.click();
   }


}
