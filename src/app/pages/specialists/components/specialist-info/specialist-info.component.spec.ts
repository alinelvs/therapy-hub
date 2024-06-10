import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistInfoComponent } from './specialist-info.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SpecialistInfoComponent', () => {
  let component: SpecialistInfoComponent;
  let fixture: ComponentFixture<SpecialistInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistInfoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialistInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
