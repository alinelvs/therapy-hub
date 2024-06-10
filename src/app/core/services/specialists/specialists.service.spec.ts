import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpecialistsService } from './specialists.service';
import { environment } from '../../../../environments/environment';
import { Specialist } from '../../../shared/models/specialist';

describe('SpecialistsService', () => {
  let service: SpecialistsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpecialistsService]
    });
    service = TestBed.inject(SpecialistsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all specialists', () => {
    const mockSpecialists: Specialist[] = [
      {
        id: 1,
        image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
        name: 'Pennie Dumphries',
        crp: '00/00001',
        uf: 'Minas Gerais',
        rating: 10,
        title: 'Psicanalista',
        languages: ['Português'],
        specialties: ['Relacionamentos / Conflitos Familiares', 'Alterações de Humor', 'Adolescência'],
        value: 140.0,
        description: 'Descrição do especialista',
        schedule: [
          {
            week: 'dom',
            month: 'JUN 19',
            hours: ['-', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']
          }
        ]
      }
    ];

    service.getAllSpecialists().subscribe((specialists) => {
      expect(specialists.length).toBe(1);
      expect(specialists).toEqual(mockSpecialists);
    });

    const req = httpMock.expectOne(`${environment.baseURL}/specialists`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSpecialists);
  });

  it('should retrieve specialist details by id', () => {
    const mockSpecialist: Specialist = {
      id: 1,
      image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
      name: 'Pennie Dumphries',
      crp: '00/00001',
      uf: 'Minas Gerais',
      rating: 10,
      title: 'Psicanalista',
      languages: ['Português'],
      specialties: ['Relacionamentos / Conflitos Familiares', 'Alterações de Humor', 'Adolescência'],
      value: 140.0,
      description: 'Descrição do especialista',
      schedule: [
        {
          week: 'dom',
          month: 'JUN 19',
          hours: ['-', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']
        }
      ]
    };

    service.getSpecialistDetails(1).subscribe((specialist) => {
      expect(specialist).toEqual(mockSpecialist);
    });

    const req = httpMock.expectOne(`${environment.baseURL}/specialists?id=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSpecialist);
  });
});
