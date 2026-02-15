import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Member {
    id: number;
    name: string;
    email: string;
    membershipType: string;
    expiryDate: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PagedResult<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export interface CreateMemberDto {
    name: string;
    email: string;
    membershipType: string;
    expiryDate: string;
}

export interface UpdateMemberDto {
    name?: string;
    email?: string;
    membershipType?: string;
    expiryDate?: string;
}

@Injectable({ providedIn: 'root' })
export class MemberService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.apiUrl}/members`;

    getMembers(
        page: number = 1,
        pageSize: number = 10,
        search?: string,
        expiredOnly: boolean = false,
        sortBy: string = 'name',
        sortDir: string = 'asc'
    ): Observable<PagedResult<Member>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString())
            .set('sortBy', sortBy)
            .set('sortDir', sortDir)
            .set('expiredOnly', expiredOnly.toString());

        if (search) {
            params = params.set('search', search);
        }

        return this.http.get<PagedResult<Member>>(this.baseUrl, { params });
    }

    getMemberById(id: number): Observable<Member> {
        return this.http.get<Member>(`${this.baseUrl}/${id}`);
    }

    createMember(dto: CreateMemberDto): Observable<Member> {
        return this.http.post<Member>(this.baseUrl, dto);
    }

    updateMember(id: number, dto: UpdateMemberDto): Observable<Member> {
        return this.http.put<Member>(`${this.baseUrl}/${id}`, dto);
    }

    deleteMember(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
