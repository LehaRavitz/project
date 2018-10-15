import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Schedule } from '../models/secdule';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Listener } from 'selenium-webdriver';

export interface LessonDuration {
  beginningTime: number;
  endTime: number;
  isCheck: boolean;
}
@Component({
  selector: 'app-show-secudle-teacher',
  templateUrl: './show-secudle-teacher.component.html',
  styleUrls: ['./show-secudle-teacher.component.css']
})
export class ShowSecudleTeacherComponent implements OnInit {
  userId: number;
  BeginningTimeStr: string;
  arrayRowsLeasson: LessonDuration[][];
  beginTimeFirst: number;
  EndTimeStr: string;
  beginTimeSecond: number;
  choosonLessons: Schedule[] = [];
  lessonOfTeacher: Schedule[] = [];
  sum: number = 1;
number:Int32Array;

  changeDate(beginning:number){
  let beginTimeArray = beginning.toString().split(" ");
    beginTimeArray = beginTimeArray[0].split(":");
   return(parseInt(beginTimeArray[0]) * 60 + parseInt(beginTimeArray[1]))*60000;
  
  }
  OnSubmit() {
    
    console.log(this.arrayRowsLeasson)
debugger;
    for (let i = 0; i < this.arrayRowsLeasson.length; i++) {
      for (let j = 0; j <this.arrayRowsLeasson[i].length; j++) {
        if (this.arrayRowsLeasson[i][j].isCheck == true) {
          let choosonLesson: Schedule = {
            BeginningTime:this.changeDate (this.arrayRowsLeasson[i][j].beginningTime),
            EndTime:this.changeDate (this.arrayRowsLeasson[i][j].endTime),
            DayOfWeek: j+1,
            IdTeacher: this.userId
          };
          this.choosonLessons.push(choosonLesson);
        }
      }
    }
    console.log(this.choosonLessons)

    debugger;
    this.userService.addScheduleTeacherChange(this.choosonLessons).subscribe((schedule: any) => alert("gkhgjhk")),
      (error: HttpErrorResponse) => alert(error.status + " " + error.statusText);
  }

  checkLesson(item: LessonDuration, dayOfWeek: number) {
    if (item.isCheck) {
      let choosonLesson: Schedule = {
        BeginningTime: item.beginningTime,
        EndTime: item.endTime,
        DayOfWeek: dayOfWeek,
        IdTeacher: this.userId
      };
      this.choosonLessons.push(choosonLesson);
    }
    else {
      let index = this.choosonLessons.indexOf(this.choosonLessons.find(g => g.DayOfWeek == dayOfWeek && g.BeginningTime == item.beginningTime));
      this.choosonLessons.splice(index, 1);
    }
  }



  private parseTime(t) {
    var d = new Date();
    var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    d.setMinutes(parseInt(time[2]) || 0);
    return d;
  }



  onChecked(i: number, j: number) {
    this.arrayRowsLeasson[i][j].isCheck = !this.arrayRowsLeasson[i][j].isCheck;
    console.log(this.arrayRowsLeasson[i][j].isCheck, i, j);
  }

  saveTimes() {

    let arraySchedule = new Array<Schedule>();
    for (let a of this.arrayRowsLeasson) {
      a.forEach((b, index) => {
        if (b.isCheck == true)

arraySchedule.push(new Schedule(b.beginningTime,  this.number, this.userId, index + 1))
      });


    }
    console.log(arraySchedule);
    this.userService.saveTimes(arraySchedule).subscribe((schedule: any) => alert("gkhgjhk")),
      (error: HttpErrorResponse) => alert(error.status + " " + error.statusText);
  }

  ngOnInit() {
    if (sessionStorage.getItem("teacherPassword") != null) { this.userId = parseInt(sessionStorage.getItem("teacherPassword")) };
    console.log(this.userId);
    let a = 1;
    let b = 1;
    let times: number[] = []
    this.userService.getTimeOfLessonTeacher(this.userId).subscribe((sc: Schedule[]) => {
      console.log(sc);
      this.lessonOfTeacher = sc;
      for (let sw of this.lessonOfTeacher) {
        if (times.length <= 0 || times.indexOf(sw.BeginningTime) == -1) {
          times[times.length] = sw.BeginningTime;
        }
      }
      times.sort((a, b) => a - b);
      this.arrayRowsLeasson = new Array<Array<LessonDuration>>();
      for (let i = 0; i < 12; i++) {
        this.arrayRowsLeasson[i] = new Array<LessonDuration>();
        let aws: LessonDuration[] = [];
        for (let j = 1; j <= 5; j++) {
          if (sc.find(x => x.BeginningTime == times[i] && x.DayOfWeek == j)) { aws[j] = { beginningTime: times[i], endTime: times[i], isCheck: true } }
          else {
            aws[j] = { beginningTime: times[i], endTime: times[i], isCheck: false }
          }
         }
      }
    },
      (error: HttpErrorResponse) => alert(error.status + " " + error.statusText));

  }
  constructor(public userService: UsersService, private router: ActivatedRoute) {
  }

}
