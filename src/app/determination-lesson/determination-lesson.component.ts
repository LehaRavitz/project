import { Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Params, Data } from '../../../node_modules/@angular/router';
import { Teacher } from '../models/teacher';
import { TeacherProfession } from '../models/teacher-profession';
import swal from 'sweetalert2';
//import { TimerObservable } from '../../../node_modules/rxjs/observable/TimerObservable';
import { TimeSpan } from '../time-span';
import { Time } from '../../../node_modules/@angular/common';
import { Schedule } from '../models/secdule';
import { Lessons } from '../models/lessons';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-determination-lesson',
  templateUrl: './determination-lesson.component.html',
  styleUrls: ['./determination-lesson.component.css']
})


export class DeterminationLessonComponent implements OnInit {




  returnSearch: TeacherProfession[];
  errorMessage: string;
  dayStudentSelect: any;
  //@ViewChild('a') buttonEl: ElementRef;
  //@ViewChild('myModal') myModal:ElementRef;
  hoursTeacher: Time;
  schedule: Schedule;
  idPupil: string;
  dayOfTeacherTeach: Array<{ id: number; name: string; }>;
  hoursOfTeacherTeach: string[];
  free: Boolean;
  lesson: Lessons;
  myOptions: { id: number; name: string; }[];
  isShowModal: boolean;
  constructor(public userService: UsersService, private router: Router) {
    this.schedule = new Schedule();
    this.lesson = new Lessons();
  }
  teteacherSearchToDeterminateacherSearch: TeacherProfession[];





  OnSubmit() {
   
    let beginTimeArray = this.schedule.BeginningTime.toString().split(" ");
    beginTimeArray = beginTimeArray[0].split(":");
    this.schedule.BeginningTime = (parseInt(beginTimeArray[0]) * 60 + parseInt(beginTimeArray[1])) * 60000;
    this.userService.CheckWhetherTheLessonIsFree(this.schedule).subscribe(res => this.free = res, error => this.errorMessage = <any>error);
    console.log(this.free);

    if (this.free == true) {
      this.userService.getIdPupil(sessionStorage.getItem('pupilPassword')).subscribe(res => {
        this.idPupil = res;
        this.lesson.BeginningTime = this.schedule.BeginningTime;
        this.lesson.Day = this.schedule.DayOfWeek;
        this.lesson.IdPupil = this.idPupil;
        this.lesson.IdTeacher = this.schedule.IdTeacher;
        this.lesson.DateStart=new Date();
        this.userService.addLesson(this.lesson).subscribe((lesson: any) => swal('השיעור נוסף בהצלחה')),
          (error: HttpErrorResponse) => alert(error.status + " " + error.statusText);
      });
    }
    if (this.free == false) {
      swal('השיעור תפוס')
    }
  }
  ngOnInit() {
    
  
    this.myOptions = [
      { id: 1, name: 'ראשון' },
      { id: 2, name: 'שני' },
      { id: 3, name: 'שלישי' },
      { id: 4, name: 'רביעי' },
      { id: 5, name: 'חמישי' },
      { id: 6, name: 'שישי' },
    ];
    this.schedule.BeginningTime = 0;
    this.userService.getallteteacherSearchToDeterminateacherSearch().subscribe(res =>
      this.teteacherSearchToDeterminateacherSearch = res,

      error => this.errorMessage = <any>error);
      console.log(this.teteacherSearchToDeterminateacherSearch)
     

  }


  onClickMe(IdTeacher: number) {
    if (sessionStorage.getItem("pupilPassword") == null){
    swal('משתמש אינו קיים ');
    this.router.navigate(['/search']);
   
  }
    //let buttonEl: HTMLInputElement = this.buttonEl.nativeElement;
    console.log(IdTeacher);
    this.userService.getDaysForTeacher(IdTeacher).subscribe(res => {
      this.dayOfTeacherTeach = this.myOptions.filter(day => {
        return res.find(a => a.DayOfWeek == day.id);
      });
    },
      error => this.errorMessage = <any>error);


    // this.hoursOfTeacherTeach = this.dayOfTeacherTeach;
    this.schedule.IdTeacher = IdTeacher;
    // console.log(this.dayOfTeacherTeach);
    //buttonEl.click();
//this.isShowModal  =true;
     //jQuery(this.myModal.nativeElement).modal('show'); 
  }
  onChange(dayStudentSelect1: any) {
    this.dayStudentSelect=dayStudentSelect1;
    this.hoursOfTeacherTeach = [];
    this.userService.getHoursForTeacher(this.schedule.IdTeacher, this.dayStudentSelect).subscribe(res => this.hoursOfTeacherTeach = res, error => this.errorMessage = <any>error);
    console.log(this.hoursOfTeacherTeach);
  }
}
