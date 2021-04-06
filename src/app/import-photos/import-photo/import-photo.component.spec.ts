import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPhotoComponent } from './import-photo.component';

describe('ImportPhotoComponent', () => {
  let component: ImportPhotoComponent;
  let fixture: ComponentFixture<ImportPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
