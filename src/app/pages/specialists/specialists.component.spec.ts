import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialistsComponent } from './specialists.component';
import { SpecialistsService } from '../../core/services/specialists/specialists.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SpecialistsComponent', () => {
  let component: SpecialistsComponent;
  let fixture: ComponentFixture<SpecialistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialistsComponent],
      providers: [SpecialistsService],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
