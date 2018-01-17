import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsCreateComponent } from './trips-create.component';

describe('TripsCreateComponent', () => {
  let component: TripsCreateComponent;
  let fixture: ComponentFixture<TripsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
