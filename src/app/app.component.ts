import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'; //not sure if needed. for .map below
import { BehaviorSubject, Observable } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();
  title = 'app';
a:any;

  constructor(private http: Http) { }
  showNavBar(ifShow: boolean) {
    this._showNavBar.next(ifShow);
}
  ngOnInit() {
   
  

  


    //  this.http.get("http://localhost:56890/api/subjects/5")
    //   .map((response) => 
    //   response.json()
    //  )
    //   .subscribe((data) => 
    //   alert(data.SubjectName)
    // )
  }
}

