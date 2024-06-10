import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SpecialistListComponent } from './specialist-list.component';
import { SpecialistsService } from '../../../core/services/specialists/specialists.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MockSpecialistsService {
  getAllSpecialists() {
    return of([
      { id: 1, name: 'Specialist One', image: '', crp: '', uf: '', rating: 10, title: 'Title One', languages: [''], specialties: [''], value: 0, description: '', schedule: [] },
      { id: 2, name: 'Specialist Two', image: '', crp: '', uf: '', rating: 10, title: 'Title Two', languages: [''], specialties: [''], value: 0, description: '', schedule: [] },
      { id: 3, name: 'Specialist Three', image: '', crp: '', uf: '', rating: 10, title: 'Title Three', languages: [''], specialties: [''], value: 0, description: '', schedule: [] }
    ]);
  }
}

describe('SpecialistListComponent', () => {
  let component: SpecialistListComponent;
  let fixture: ComponentFixture<SpecialistListComponent>;
  let specialistsService: SpecialistsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialistListComponent],
      providers: [{ provide: SpecialistsService, useClass: MockSpecialistsService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistListComponent);
    component = fixture.componentInstance;
    specialistsService = TestBed.inject(SpecialistsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize specialists on ngOnInit', () => {
    component.ngOnInit();
    expect(component.allSpecialists.length).toBe(3);
    expect(component.specialists.length).toBe(2);
  });

  it('should load more specialists', () => {
    component.ngOnInit();
    component.loadMoreSpecialists();
    expect(component.specialists.length).toBe(3);
    expect(component.noMorePosts).toBe(true);
  });

  it('should handle error when getting all specialists', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    jest.spyOn(specialistsService, 'getAllSpecialists').mockReturnValue(throwError(() => new Error('Error')));

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('Failed to load specialists', new Error('Error'));
  });
});
