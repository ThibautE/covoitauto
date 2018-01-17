import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsDisplayComponent } from './trips-display.component';

describe('TripsDisplayComponent', () => {
  let component: TripsDisplayComponent;
  let fixture: ComponentFixture<TripsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
