import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeterminationLessonComponent } from './determination-lesson.component';

describe('DeterminationLessonComponent', () => {
  let component: DeterminationLessonComponent;
  let fixture: ComponentFixture<DeterminationLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeterminationLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeterminationLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
