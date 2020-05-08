import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarStateComponent } from './war-state.component';

describe('WarStateComponent', () => {
  let component: WarStateComponent;
  let fixture: ComponentFixture<WarStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
