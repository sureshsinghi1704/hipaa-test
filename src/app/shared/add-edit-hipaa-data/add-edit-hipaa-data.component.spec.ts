import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHipaaDataComponent } from './add-edit-hipaa-data.component';

describe('AddEditHipaaDataComponent', () => {
  let component: AddEditHipaaDataComponent;
  let fixture: ComponentFixture<AddEditHipaaDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditHipaaDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditHipaaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
