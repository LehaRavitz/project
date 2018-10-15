
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, getDate, isSameISOWeek } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDateFormatter, DAYS_OF_WEEK } from 'angular-calendar';

import { CustomDateFormatter } from '../CustomDateFormatter.provider';
import { UsersService } from '../../users.service';
import { Lessons } from '../../models/lessons';
import { HttpErrorResponse } from '@angular/common/http';
import { EventCalendar } from '../../models/event-calendar';
import { TeacherProfession } from '../../models/teacher-profession';
import { Schedule } from '../../models/secdule';
import { Teacher } from '../../models/teacher';
import swal from 'sweetalert2';

registerLocaleData(localeHe);
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css'],
  templateUrl: './calendar.component.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }]
})
export class CalendarComponent implements OnInit {
  [x: string]: any;
  c: Lessons[];
  calendarEvent: EventCalendar;
  // locale: string = 'en';
  locale: string = 'he';
  time: any;
  sss: any;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('modalContent1') modalContent1: TemplateRef<any>;
  date3: any;
  d: Date;
  view: string = 'month';
  public languages: any[];
  public teacherSearchBySandD: Schedule[];
  public teacherForOneLesson:Schedule;
  public teacherhello: Teacher;
  public teacherhello2: TeacherProfession;
  public addOneLesson:EventCalendar;
  viewDate: Date = new Date();
mySchedule:Schedule;
  password: any;
  activeDayIsOpen: boolean = false;

  ngOnInit() {
    this.userService.getPassword(sessionStorage.getItem("pupilPassword"));

    this.getallsubjects();
    this.password = sessionStorage.getItem("pupilPassword")
    this.userService.getAllLessonsCalanders(this.password).subscribe((res: Lessons[]) => {
      this.c = res; console.log(this.c); this.eventsPrimery();
    
    })




  }
  login() {
    console.log(this.date3);
    console.log(this.date3);
   
    this.teacherSearchBySandD.forEach(element => {
      if(element.BeginningTime==this.time)
       this.teacherForOneLesson=element;

    });

     this.userService.GetTeacherToSayHello(this.teacherForOneLesson)
     .subscribe((teacherhello: Teacher) =>
     {
       this.userService.GetTeacherToSayHello2(this.teacherForOneLesson)
       .subscribe((teacherhello2: TeacherProfession) => 
    
        {
      swal(
        "     נקבע שיעור חד פעמי"+'<br>'+
        "   המורה"+"    "+teacherhello.FirstName+" "+teacherhello.LastName+'<br>'+
        "   כתובת "+"   "+teacherhello.City+"    "+teacherhello.Street+"    "+teacherhello.numHouse+'<br>'+
        "    בשעה:"+"   "+this.time+'<br>'+
        "    במחיר:"+"   "+teacherhello2.Price+'<br>'
       )
     }),
       
      
      (error: HttpErrorResponse) => alert(error.status + " " + error.statusText)}),
     (error: HttpErrorResponse) => alert(error.status + " " + error.statusText);
       
      
      
      
      
      
      
      

   
    
    
   
    

  }
  getallsubjects() {
    this.userService.getallsubjects().subscribe(res => this.languages = res, error => this.errorMessage = <any>error);

  }
  onChange() {
    this.userService.GetTeacherBySubjectAndDate(this.sss, this.date3.getDay()).subscribe(res => this.teacherSearchBySandD = res, error => this.errorMessage = <any>error);
  }
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {   
  

        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();


  
  events: CalendarEvent[] = [
    {
      id: 1,
      start: new Date(),
      title: 'קים שיעור היום',
      color: colors.red,
      actions: this.actions,
      meta: { teacherId: 1, userId: 6 }
    },

  ];

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.date3 = date;
    this.addLessonInDay(date);
    this.modal.open(this.modalContent1, { size: 'lg' });

    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
     this.modal.open(this.modalContent, { size: 'lg' });
    this.modal.open(this.modalContent1, { size: 'lg' });

  }

  addEvent(): void {
    this.modal.open(this.modalContent1, { size: 'lg' });
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
  addLessonInDay(date): void {

    this.events.push({
      title: 'שיעור חדש',
      start: startOfDay(date),
      end: endOfDay(date),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
  eventsPrimery() {
    this.c.forEach(element => {
      this.events.push({

        title: (element.IdTeacher).toString(),
        start: startOfDay(element.DateStart),
        end: endOfDay(element.DateStart),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      });

    });
    this.refresh.next();
  }
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];


  modalData: {
    action: string;
    event: CalendarEvent;
  };


  constructor(private modal: NgbModal, public userService: UsersService) {

  }


  clickedDate(e) {
  }
  //   this.userService.lessonsByDate(e).subscribe((lessons: Lessons[]) =>{alert("hhjk") ,console.log(lessons)}),
  //   (error: HttpErrorResponse) => alert(error.status + " " + error.statusText);

  // }

  eventTimesChanged({
    event,
    newStart
    //  ,newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    // event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }
}