import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSecudleTeacherComponent } from './show-secudle-teacher.component';

describe('ShowSecudleTeacherComponent', () => {
  let component: ShowSecudleTeacherComponent;
  let fixture: ComponentFixture<ShowSecudleTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSecudleTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSecudleTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
