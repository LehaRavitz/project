import { Component, OnInit , OnChanges, SimpleChanges} from '@angular/core';
import { Pupils } from '../models/pupils';
import { UsersService } from '../users.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pupil-register',
  templateUrl: './pupil-register.component.html',
  styleUrls: ['./pupil-register.component.css']
})
export class PupilRegisterComponent implements OnInit {

  OnSubmit()
  {
    debugger;
    this.userService.addPupil(this.myPupil).subscribe((pupil:any)=>alert("gkhgjhk"))
    Swal('Hello world!'),
    (error: HttpErrorResponse) => alert(error.status + " " + error.statusText);
  }
  onClickMe(){
    
    Swal({
      position: 'top-end',
      type: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
  myPupil:Pupils;
  constructor(public userService:UsersService) { 
   
this.myPupil=new Pupils();
  }
  ngOnInit() {
 
  }

  
}