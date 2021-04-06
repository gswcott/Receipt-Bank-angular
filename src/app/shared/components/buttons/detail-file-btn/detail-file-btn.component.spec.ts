import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFileBtnComponent } from './detail-file-btn.component';

describe('DetailFileBtnComponent', () => {
  let component: DetailFileBtnComponent;
  let fixture: ComponentFixture<DetailFileBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFileBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFileBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
