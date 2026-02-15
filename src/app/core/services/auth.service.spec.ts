import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [AuthService]
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        localStorage.clear();
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login and store token', () => {
        const mockResponse = {
            accessToken: 'fake-token',
            expiresIn: 3600,
            user: {
                email: 'test@test.com',
                roles: ['User'],
                permissions: []
            }
        };

        service.login('test@test.com', 'password').subscribe(response => {
            expect(response.accessToken).toBe('fake-token');
            expect(localStorage.getItem('auth_token')).toBe('fake-token');
            expect(service.isLoggedIn()).toBeTrue();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    });

    it('should logout and clear token', () => {
        // Setup initial state
        localStorage.setItem('auth_token', 'old-token');

        // Trigger logout
        service.logout().subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/auth/logout`);
        expect(req.request.method).toBe('POST');
        req.flush({});

        expect(localStorage.getItem('auth_token')).toBeNull();
        expect(service.isLoggedIn()).toBeFalse();
    });
});
