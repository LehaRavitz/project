
import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { TeacherProfession } from '../models/teacher-profession';
import { UsersService } from '../users.service';
import { Teacher } from '../models/teacher';
import { HttpErrorResponse } from '@angular/common/http';
import { Search } from '../models/search';
import { Subject } from '../../../node_modules/rxjs';

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { forEach } from '../../../node_modules/@angular/router/src/utils/collection';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('openModal') openModal:ElementRef;

  returnSearch: TeacherProfession[];
  errorMessage: string;
  filter: any;
  public languages: any[];
  public cities: any[];
  public streets: any[];
  public grades: any[];

  public strretsSelected: any[];
  sampleform: FormGroup;


  OnSubmit() {
     debugger;
    this.userService.getSearch(this.filter, this.search.subject, this.search.city, this.search.street).subscribe((res: TeacherProfession[]) => {
      this.returnSearch = res;
console.log(this.returnSearch);
     debugger;
      this.router.navigate(['/determination-lesson']);
      console.log(this.sampleform);

    })

  }
  search: Search;
  constructor(public userService: UsersService, fb: FormBuilder, private router: Router) {
    this.search = new Search();
    this.sampleform = fb.group({
      'id': [null]

    })
  }
  ngOnInit() {
    this.getallsubjects();
    this.getallcities();
    // this.userService.rrrrrr().subscribe(
      // (error: HttpErrorResponse) => alert(error.status + " " + error.statusText));
  }
  getallsubjects() {
    this.userService.getallsubjects().subscribe(res => this.languages = res, error => this.errorMessage = <any>error);

  }
  getallcities() {
    this.userService.getallCities().subscribe(res => this.cities = res, error => this.errorMessage = <any>error);

  }
 
  onChange(citySelect) {
    this.userService.GetAllStreets(citySelect).subscribe(res => this.strretsSelected = res, error => this.errorMessage = <any>error);
  }








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
  
  pupils: any;
  s: any;



}
