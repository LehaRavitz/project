import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilRegisterComponent } from './pupil-register.component';

describe('PupilRegisterComponent', () => {
  let component: PupilRegisterComponent;
  let fixture: ComponentFixture<PupilRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PupilRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
