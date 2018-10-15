import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {
 @Input()
  day: Number;
  saveUsername:boolean;
OnSubmit(){

}
  constructor(public userService:UsersService,private router: ActivatedRoute) {
    
    

   }

  range(input){
    return Array(input);
  }


  ngOnInit() {
  }

  
}
