import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
//import { HttpModule } from '@angular/http';
import { Pupils } from './models/pupils';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';


import { debug } from 'util';
import { Teacher } from './models/teacher';
import { Schedule } from './models/secdule'
// import { from } from 'rxjs/observable/from';
// import { map } from 'rxjs/operator/map';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TeacherProfession } from './models/teacher-profession';
import { Search } from './models/search';
// import { LessonDuration } from './show-secudle-teacher/show-secudle-teacher.component';
import { Subject } from './models/subject';
import { TimeSpan } from './time-span';
import { Time } from '../../node_modules/@angular/common';
import { Lessons } from './models/lessons';
import { Grade } from './models/grade';
import { observable } from '../../node_modules/rxjs';
import { Data } from '../../node_modules/@angular/router';
import { EventCalendar } from './models/event-calendar';
//import { Response } from '@angular/http/src/static_response';
//import { HttpErrorResponse, HttpClient } from "@angular/common/http";
//import { Time } from '@angular/common/src/i18n/locale_data_api';

@Injectable()
export class UsersService {
    lessonsByDate(date: Date): Observable<Lessons[]> {
        debugger;

        return this.http.post("http://localhost:52339/api/pupil/lessons/" + sessionStorage.getItem('pupilPassword'), date)
            .map((res: Lessons[]) => res).catch((res: HttpErrorResponse) => Observable.throw(res));
    }
    GetTeacherBySubjectAndDate(sss: Int32Array,date:Int32Array): Observable<Schedule[]> {
        return this.http.get("http://localhost:52339/api/teacherProfessionController/GetTeacherBySubjectAndDate/" + sss+"/"+date)
            .map((res: Schedule[]) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
    }
    getPassword(password1:string) {
        return this.http.get("http://localhost:52339/api/Teacher/" +password1)
        .map((res: any) => res)
        .catch((res: HttpErrorResponse) => Observable.throw(res));
    }
    
    GetTeacherToSayHello(teacherForOneLesson: Schedule) : Observable<Teacher>{
        debugger;
        return this.http.post("http://localhost:52339/api/teacherProfessionController/GetTeacherToSayHello" ,teacherForOneLesson)
            .map((res: any) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
    }
    GetTeacherToSayHello2(teacherForOneLesson: Schedule) : Observable<TeacherProfession>{
        debugger;
        return this.http.post("http://localhost:52339/api/teacherProfessionController/GetTeacherToSayHello2" ,teacherForOneLesson)
            .map((res: any) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
    }
    // GetTeacherToSayHello(teacherForOneLesson:Schedule): Observable<TeacherProfession> {
    //     return this.http.get("http://localhost:52339/api/teacherProfessionController/GetTeacherBySubjectAndDate/" +teacherForOneLesson)
    //         .map((res: TeacherProfession) => res)
    //         .catch((res: HttpErrorResponse) => Observable.throw(res));
    // }

    IsRegisteredTeacher(passwordTeacher: any) {
        debugger;
        return this.http.get("http://localhost:52339/api/teacherProfessionController/IsRegisteredTeacher/" + passwordTeacher)
            .map((res: any) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
    }



    addteacherProfession(teacherProfession: TeacherProfession): Observable<TeacherProfession> {
        debugger;
        return this.http.post("http://localhost:52339/api/teacherProfessionController/addteacherProfession", teacherProfession)
            .map((res: TeacherProfession) => res);
    }





    teacherSearch: TeacherProfession[];
    constructor(private http: HttpClient) {

    }
    CheckWhetherTheLessonIsFree(schedule: Schedule) {
        debugger;
        return this.http.post("http://localhost:52339/api/Schedule/CheckWhetherTheLessonIsFree", schedule)
            .map((res: any) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
    }
    getHoursForTeacher(IdTeacher: number, dayStudentSelect: any) {

        debugger;
        return this.http.get("http://localhost:52339/api/Schedule/getHoursForTeacher/" + IdTeacher + "/" + dayStudentSelect)
            .map((res: any) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
    }

    getDaysForTeacher(IdTeacher: number) {
        debugger;
        return this.http.get("http://localhost:52339/api/Schedule/getDaysForTeacher/" + IdTeacher)
            .map((res: any) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
    }

    saveTimes(arrayRowsLeasson: Schedule[]): Observable<any> {
        debugger;
        return this.http.post("http://localhost:52339/api/schedule/save", arrayRowsLeasson)
            .map((res: any) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
    }

    GetAllPupils(Username: string, Password: string) {
        debugger;
        return this.http.get("http://localhost:52339/api/Pupils/" + Username + "/" + Password)
            .map((res: any) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));

    }


    getSearch(filter: any, subject1: string, city1: string, street1: string): Observable<TeacherProfession[]> {
        debugger;
        return this.http.get("http://localhost:52339/api/teacherProfessionController/getSearch/" + filter + "/" + subject1 + "/" + city1 + "/" + street1)
            .map((res: TeacherProfession[]) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
        

        // .map((response: Schedule[]) =>response)
        // .catch((response: HttpErrorResponse) => Observable.throw(response));
        /*.map((response: Pupils) => alert(JSON.stringify(response)))
            .catch((response: HttpErrorResponse) => { return Observable.throw(response) }).subscribe();*/
    }



    addTeacher(newTeacher: Teacher): Observable<Teacher> {
        debugger;
        return this.http.post("http://localhost:52339/api/teacher/register", newTeacher)
            .map((res: Teacher) => res);

    }
    addPupil(newPupil: Pupils): Observable<Pupils> {
        debugger;
        return this.http.post("http://localhost:52339/api/pupil/register", newPupil)
            .map((res: Pupils) => res);
        //.subscribe(data => alert(data));
        /*.catch((response: HttpErrorResponse) => Observable.throw(response));*/
    }
    // addScheduleTeacher(choosonLessons:any,IdTeacher:number,begin:string,end:string): Observable<scheduleTeacher> {
    //     debugger;
    //     return this.http.post("http://localhost:52339/api/schedule/addScheduleTeacher",choosonLessons,IdTeacher,begin,end )
    //         .catch((response: HttpErrorResponse) => Observable.throw(response));
    // }

    addScheduleTeacher(scheduleTeacher: Schedule[]): Observable<Teacher> {
        debugger;
        return this.http.post("http://localhost:52339/api/Schedule/addScheduleTeacher", scheduleTeacher)
            .map((res: Teacher) => res);

        //.subscribe(data => alert(data));
        /*.catch((response: HttpErrorResponse) => Observable.throw(response));*/
    }
    addScheduleTeacherChange(scheduleTeacher: Schedule[]): Observable<Teacher> {
        debugger;
        return this.http.post("http://localhost:52339/api/Schedule/AddScheduleTeacherChange", scheduleTeacher)
            .map((res: Teacher) => res);

        //.subscribe(data => alert(data));
        /*.catch((response: HttpErrorResponse) => Observable.throw(response));*/
    }


    getTimeOfLessonTeacher(e: number): Observable<Schedule[]> {


        return this.http.get("http://localhost:52339/api/Schedule/getAllLessonOfTeacher/" + e)
            .map((response: Schedule[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));

    }



    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure  
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    getallsubjects(): Observable<Subject[]> {
        return this.http.get("http://localhost:52339/api/teacherProfessionController/Gettbl_subjects")
            .map((response: Subject[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    getallCities(): Observable<string[]> {
        return this.http.get("http://localhost:52339/api/teacherProfessionController/Gettbl_city")
            .map((response: string[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    getallGrades(): Observable<Grade[]> {
        return this.http.get("http://localhost:52339/api/teacherProfessionController/Gettbl_grads")
            .map((response: Grade[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    GetAllStreets(citySelect: string): Observable<string[]> {
        return this.http.get("http://localhost:52339/api/teacherProfessionController/GetAllStreets/" + citySelect)
            .map((res: string[]) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
    }
    getallteteacherSearchToDeterminateacherSearch(): Observable<TeacherProfession[]> {
        return this.http.get("http://localhost:52339/api/teacherProfessionController/geTteteacherSearchToDeterminateacherSearch")
            .map((response: TeacherProfession[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    getIdPupil(pupilPassword: string): Observable<string> {
        debugger;
        return this.http.get("http://localhost:52339/api/Pupils/getIdPupil/" + pupilPassword)
            .map((res: string) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
    }
    addLesson(lesson: Lessons): Observable<Lessons> {
        debugger;
        return this.http.post("http://localhost:52339/api/Schedule/addLesson", lesson)
            .map((res: Lessons) => res);
    }

    rrrrrr() {
        debugger;
        return this.http.get("http://localhost:52339/api/Pupils1")
            .map((res: any) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));

    }
   
 

    getAllLessonsCalanders(  Password:string): Observable<Lessons[]> {
        debugger;
        return this.http.get("http://localhost:52339/api/teacherProfessionController/getAllLessonsCalanders/"+Password )
            .map((res: any) => res)
            .catch((res: HttpErrorResponse) => Observable.throw(res));
        
}

}









