import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantBandComponent } from './participant-band.component';

describe('ParticipantBandComponent', () => {
  let component: ParticipantBandComponent;
  let fixture: ComponentFixture<ParticipantBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
