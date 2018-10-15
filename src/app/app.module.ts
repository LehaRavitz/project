import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map'; //not sure if needed. for .map below
//import { NgPipesModule } from 'ngx-pipes';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersService } from './users.service';
import { PupilRegisterComponent } from './pupil-register/pupil-register.component';
import { Routes, RouterModule } from "@angular/router"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import "rxjs/Rx";

import { IDToNamePipe } from '../pipes/IDToName.pipe';
import * as _flatpickr from 'flatpickr';
import { FlatpickrFn } from 'flatpickr/dist/types/instance';
import { CalendarModule } from 'angular-calendar';
import 'flatpickr/dist/flatpickr.css';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { SearchComponent } from './search/search.component';
import { ScheduleTeacherComponent } from './schedule-teacher/schedule-teacher.component';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { ShowSecudleTeacherComponent } from './show-secudle-teacher/show-secudle-teacher.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeterminationLessonComponent } from './determination-lesson/determination-lesson.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlideshowModule } from '../../src/app/slideshow/slideshow.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { AboatComponent } from './aboat/aboat.component';

const route: Routes = [
  {
    path: 'login', component: LoginComponent, children: [
      { path: 'search', component: SearchComponent },
      { path: 'show-secudle-teacher/:password', component: ShowSecudleTeacherComponent }]
  },
  {
    path: 'search', component: SearchComponent, children: [
      { path: 'determination-lesson', component: DeterminationLessonComponent }]
  },
  { path: 'teacher-register', component: TeacherRegisterComponent },
  { path: 'slideshow.component', component: SlideshowModule },
  { path: 'calendar', component: CalendarComponent },
  { path: 'pupil-register', component: PupilRegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'app', component: AppComponent },

  { path: 'schedule-teacher/:password', component: ScheduleTeacherComponent },
  { path: 'schedule-table', component: ScheduleTableComponent },
  { path: 'aboat', component: AboatComponent },

  { path: 'show-secudle-teacher', component: ShowSecudleTeacherComponent },
  { path: 'determination-lesson', component: DeterminationLessonComponent },
  { path: '', component: SearchComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PupilRegisterComponent,
    TeacherRegisterComponent,
    SearchComponent,
    ScheduleTeacherComponent,
    ScheduleTableComponent,
    ShowSecudleTeacherComponent,
    DeterminationLessonComponent,
    CalendarComponent,IDToNamePipe, AboatComponent
  ],
  imports: [BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    BrowserModule,
    FormsModule,
    SlideshowModule,
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(route),
     CalendarModule.forRoot(),
    CommonModule,
    FlatpickrModule.forRoot(), 

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //NgPipesModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule//,
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory
    // })
  ],
  providers: [UsersService],
  bootstrap: [AppComponent],
  exports: [ScheduleTableComponent]
})
export class AppModule { }


