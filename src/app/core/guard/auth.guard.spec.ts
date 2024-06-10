import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      isLoggedIn: jest.fn()
    };

    const routerMock = {
      navigateByUrl: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow activation if the user is logged in', () => {
    jest.spyOn(authService, 'isLoggedIn').mockReturnValue(true);

    expect(guard.canActivate()).toBe(true);
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('should prevent activation and redirect to login if the user is not logged in', () => {
    jest.spyOn(authService, 'isLoggedIn').mockReturnValue(false);
    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');

    expect(guard.canActivate()).toBe(false);
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/login');
  });
});
