import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraBtnComponent } from './camera-btn.component';

describe('CameraBtnComponent', () => {
  let component: CameraBtnComponent;
  let fixture: ComponentFixture<CameraBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
