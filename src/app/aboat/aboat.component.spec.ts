import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboatComponent } from './aboat.component';

describe('AboatComponent', () => {
  let component: AboatComponent;
  let fixture: ComponentFixture<AboatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
