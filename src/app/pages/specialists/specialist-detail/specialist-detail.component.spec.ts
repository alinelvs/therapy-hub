import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SpecialistDetailComponent } from './specialist-detail.component';
import { SpecialistsService } from '../../../core/services/specialists/specialists.service';
import { Specialist } from '../../../shared/models/specialist';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MockSpecialistsService {
  getSpecialistDetails(id: number) {
    return of({
      id,
      name: 'Specialist One',
      image: '',
      crp: '',
      uf: '',
      rating: 10,
      title: 'Title One',
      languages: [''],
      specialties: [''],
      value: 0,
      description: '',
      schedule: []
    });
  }
}

describe('SpecialistDetailComponent', () => {
  let component: SpecialistDetailComponent;
  let fixture: ComponentFixture<SpecialistDetailComponent>;
  let specialistsService: SpecialistsService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialistDetailComponent],
      providers: [
        { provide: SpecialistsService, useClass: MockSpecialistsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 1 } }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistDetailComponent);
    component = fixture.componentInstance;
    specialistsService = TestBed.inject(SpecialistsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load specialist details on ngOnInit', () => {
    component.ngOnInit();
    expect(component.specialist).toEqual({
      id: 1,
      name: 'Specialist One',
      image: '',
      crp: '',
      uf: '',
      rating: 10,
      title: 'Title One',
      languages: [''],
      specialties: [''],
      value: 0,
      description: '',
      schedule: []
    });
  });

  it('should handle error when getting specialist details', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    jest.spyOn(specialistsService, 'getSpecialistDetails').mockReturnValue(throwError(() => new Error('Error')));

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('Failed to load specialist details', new Error('Error'));
    expect(component.specialist).toBeNull();
  });
});
