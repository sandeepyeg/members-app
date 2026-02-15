import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MemberService } from './member.service';
import { environment } from '../../../../environments/environment';

describe('MemberService', () => {
    let service: MemberService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MemberService]
        });
        service = TestBed.inject(MemberService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve members', () => {
        const dummyMembers = {
            items: [
                { id: 1, name: 'John', email: 'john@test.com', membershipType: 'Basic', expiryDate: '2023-01-01' },
            ],
            page: 1,
            pageSize: 10,
            totalCount: 1,
            totalPages: 1
        };

        service.getMembers().subscribe(members => {
            expect(members.items.length).toBe(1);
            expect(members.items).toEqual(dummyMembers.items);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/members?page=1&pageSize=10&sortBy=name&sortDir=asc&expiredOnly=false`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyMembers);
    });

    it('should create a member', () => {
        const newMember = { name: 'New User', email: 'new@test.com', membershipType: 'Premium', expiryDate: '2024-01-01' };

        service.createMember(newMember).subscribe(member => {
            expect(member.name).toBe('New User');
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/members`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newMember);

        req.flush({ ...newMember, id: 123 });
    });
});
