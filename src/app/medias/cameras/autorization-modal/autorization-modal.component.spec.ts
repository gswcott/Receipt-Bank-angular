import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizationModalComponent } from './autorization-modal.component';

describe('AutorizationModalComponent', () => {
  let component: AutorizationModalComponent;
  let fixture: ComponentFixture<AutorizationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
