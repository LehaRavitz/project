import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UsersService } from '../users.service';
import { Schedule } from '../models/secdule';
import { Scheduler } from 'rxjs/Scheduler';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { TeacherProfession } from '../models/teacher-profession';
import { Subject } from '../models/Subject';

//import { min } from 'date-fns';
import { enableDebugTools } from '@angular/platform-browser/src/browser/tools/tools';
import { debug } from 'util';
import { TimeSpan } from '../time-span';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";
import { Grade } from '../models/grade';
// import { Subject } from '../../../node_modules/rxjs';


interface LessonDuration {
  beginningTime: number;
  endTime: number;
  isCheck: boolean;
}

@Component({
  selector: 'app-schedule-teacher',
  templateUrl: './schedule-teacher.component.html',
  styleUrls: ['./schedule-teacher.component.css']
})

export class ScheduleTeacherComponent implements OnInit {
  sub: any;

  saveTimeOfLesson() {
    this.initMaterixOfLessons();


    

  }
  public subjectsTeacher: Subject[];
  public gradsTeacher: Grade[];

  private nameProducts: any;
  IsRegisteredTeacher: Boolean;
  BeginningTimeStr: string;
  EndTimeStr: string;
  priceForLesson: number;
  scheduleTeacher: Schedule;
  public grades: any[];
  public languages: any[];
  ppp: any;
  errorMessage: string;
  DurationLesson45: number;
  lali: TimeSpan;
  idTeacher: any;
  userId: number;
  DurationLesson65: number;
  numOfLessonsFromUser: any;
  s: any;
  arrayRowsLeasson: LessonDuration[];
  choosonLessons: Schedule[] = [];
  teacherProfession: TeacherProfession;
  teacherProfession1: TeacherProfession;

  OnSubmit() {
debugger;
    this.choosonLessons.forEach(element => {
      element.IdTeacher = +(sessionStorage.getItem('teacherPassword'));
    });
    this.userService.addteacherProfession(this.teacherProfession).subscribe((schedule: any) => alert("gkhgjhk")),
    (error: HttpErrorResponse) => alert(error.status + " " + error.statusText);

   
    this.userService.addScheduleTeacher(this.choosonLessons).subscribe((schedule: any) => alert("gkhgjhk")),
      (error: HttpErrorResponse) => alert(error.status + " " + error.statusText);

 
  }
  flag: number = 60;

  checkLesson(item: LessonDuration, dayOfWeek: number) {
    if (item.isCheck) {
      let choosonLesson: Schedule = {
        BeginningTime: item.beginningTime,
        EndTime: item.endTime,
        DayOfWeek: dayOfWeek,
        IdTeacher: +(sessionStorage.getItem('teacherPassword'))
      };
      this.choosonLessons.push(choosonLesson);
    }
    else {
      let index = this.choosonLessons.indexOf(this.choosonLessons.find(g => g.DayOfWeek == dayOfWeek && g.BeginningTime == item.beginningTime));
      this.choosonLessons.splice(index, 1)
    }
  }
  constructor(public userService: UsersService, private router: ActivatedRoute) {
    debugger;
    this.userService.getallsubjects().subscribe(res => this.subjectsTeacher = res, error => this.errorMessage = <any>error);
    this.userService.getallGrades().subscribe(res => this.gradsTeacher = res, error => this.errorMessage = <any>error);

    // this.userService.getallsubjects().subscribe((schedule: any) => alert("gkhgjhk")),
    //   (error: HttpErrorResponse) => alert(error.status + " " + error.statusText);
    this.scheduleTeacher = new Schedule();
    this.teacherProfession = new TeacherProfession();
  }
  OnSubmitSubjects()
  {
    this.idTeacher = +(sessionStorage.getItem('teacherPassword'));
    this.teacherProfession.IdTeacher = this.idTeacher;
    this.teacherProfession1=this.teacherProfession;

    this.userService.addteacherProfession(this.teacherProfession).subscribe((teacherProfession: any) => alert("gkhgjhk")),
    (error: HttpErrorResponse) => alert(error.status + " " + error.statusText);
  }
  private initMaterixOfLessons() {
    this.arrayRowsLeasson = new Array<LessonDuration>();
    // let beginTimeArray = this.BeginningTimeStr.split(" ");
    // beginTimeArray = beginTimeArray[0].split(":");
    // let endTimeArray = this.EndTimeStr.split(" ");
    // endTimeArray = endTimeArray[0].split(":");

    for (var i = 0; i < 12; i ++) {

      let lessonDuration: LessonDuration = {
        beginningTime: (i+10) * 3600000,
        endTime: (i +11) * 3600000,
        isCheck: false
      };
      this.arrayRowsLeasson.push(lessonDuration);
    }
  }
  getallGrades() {
    this.userService.getallGrades().subscribe(res => this.grades = res, error => this.errorMessage = <any>error);

  }
  getallsubjects() {
    this.userService.getallsubjects().subscribe(res => this.languages = res, error => this.errorMessage = <any>error);

  }
  ngOnInit() {

    this.idTeacher = +(sessionStorage.getItem('teacherPassword'));
    this.router.root.params.subscribe((params: Params) => {
      if (this.router.snapshot.url[1].path) { this.userId = +this.router.snapshot.url[1].path; }
    }); this.getallsubjects();
    this.getallGrades();
    this.userService.IsRegisteredTeacher(this.idTeacher).subscribe(res => this.IsRegisteredTeacher = res, error => this.errorMessage = <any>error);
    console.log(this.IsRegisteredTeacher);
this.initMaterixOfLessons();
  }
}
