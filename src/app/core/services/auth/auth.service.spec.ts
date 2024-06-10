import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('authenticate', () => {
    it('should return "success" if credentials are valid', () => {
      const mockUser: User = { id: 1, email: 'test@example.com', password: '123456', name: 'Test User' };
      const credentials = { email: 'test@example.com', password: '123456' };

      service.authenticate(credentials).subscribe(status => {
        expect(status).toBe('success');
        expect(localStorage.getItem('sessionAuthToken')).toBe(JSON.stringify(`user-${mockUser.email}-${mockUser.name}-token`));
        expect(localStorage.getItem('sessionUserName')).toBe(JSON.stringify(mockUser.name));
      });

      const req = httpMock.expectOne(`${environment.baseURL}/account?email=test@example.com`);
      expect(req.request.method).toBe('GET');
      req.flush([mockUser]);
    });

    it('should return "invalid" if credentials are invalid', () => {
      const credentials = { email: 'test@example.com', password: 'wrong-password' };

      service.authenticate(credentials).subscribe(status => {
        expect(status).toBe('invalid');
        expect(localStorage.getItem('sessionAuthToken')).toBeNull();
        expect(localStorage.getItem('sessionUserName')).toBeNull();
      });

      const req = httpMock.expectOne(`${environment.baseURL}/account?email=test@example.com`);
      expect(req.request.method).toBe('GET');
      req.flush([{ id: 1, email: 'test@example.com', password: '123456', name: 'Test User' }]);
    });

    it('should handle http error', () => {
      const credentials = { email: 'test@example.com', password: '123456' };

      service.authenticate(credentials).subscribe(
        () => fail('should have failed with an error'),
        (error) => {
          expect(error).toBeTruthy();
        }
      );

      const req = httpMock.expectOne(`${environment.baseURL}/account?email=test@example.com`);
      expect(req.request.method).toBe('GET');
      req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if user is logged in', () => {
      localStorage.setItem('sessionAuthToken', 'some-token');
      expect(service.isLoggedIn()).toBe(true);
    });

    it('should return false if user is not logged in', () => {
      localStorage.removeItem('sessionAuthToken');
      expect(service.isLoggedIn()).toBe(false);
    });
  });

  describe('logout', () => {
    it('should clear localStorage and navigate to /login', () => {
      const navigateSpy = jest.spyOn(router, 'navigateByUrl');
      service.logout();
      expect(localStorage.getItem('sessionAuthToken')).toBeNull();
      expect(localStorage.getItem('sessionUserName')).toBeNull();
      expect(navigateSpy).toHaveBeenCalledWith('/login');
    });
  });

  describe('getUserName', () => {
    it('should return the user name if it exists in localStorage', () => {
      localStorage.setItem('sessionUserName', JSON.stringify('Test User'));
      expect(service.getUserName()).toBe('Test User');
    });

    it('should return null if no user name in localStorage', () => {
      localStorage.removeItem('sessionUserName');
      expect(service.getUserName()).toBeNull();
    });
  });
});
