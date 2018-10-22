import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakenewsComponent } from './fakenews.component';

describe('FakenewsComponent', () => {
  let component: FakenewsComponent;
  let fixture: ComponentFixture<FakenewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakenewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
