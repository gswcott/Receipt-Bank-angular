import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFolderBtnComponent } from './add-folder-btn.component';

describe('AddFolderBtnComponent', () => {
  let component: AddFolderBtnComponent;
  let fixture: ComponentFixture<AddFolderBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFolderBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFolderBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
