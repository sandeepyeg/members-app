import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { Observable, of, from } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../../../core/services/loading.service';

@Injectable({ providedIn: 'root' })
export class MemberService {

    constructor(private loading: LoadingService) { }

    private members: Member[] = [
        { id: 1, name: 'John Doe', email: 'john@mail.com', membershipType: 'Premium', expiryDate: '2026-03-01' },
        { id: 2, name: 'Sara Smith', email: 'sara@mail.com', membershipType: 'Basic', expiryDate: '2024-01-01' },
        { id: 3, name: 'Mike Ross', email: 'mike@mail.com', membershipType: 'Premium', expiryDate: '2025-12-10' }
    ];

    getMembers(): Observable<Member[]> {
        this.loading.show();

        return of(this.members).pipe(
            delay(200),
            finalize(() => this.loading.hide())
        );
    }

    isEmailTaken(email: string): Observable<boolean> {
        this.loading.show();

        const takenEmails = ['john@mail.com', 'admin@mail.com'];

        return from(
            new Promise<boolean>(resolve => {
                setTimeout(() => {
                    resolve(takenEmails.includes(email.toLowerCase()));
                }, 800);
            })
        ).pipe(
            finalize(() => this.loading.hide())
        );
    }

    getMemberById(id: number): Observable<Member | undefined> {
        this.loading.show();

        return of(this.members.find(m => m.id === id)).pipe(
            delay(500),
            finalize(() => this.loading.hide())
        );
    }

    createMember(member: Member): Observable<Member> {
        this.loading.show();

        const newMember = { ...member, id: Date.now() };
        this.members = [...this.members, newMember];

        return of(newMember).pipe(
            delay(800),
            finalize(() => this.loading.hide())
        );
    }

    updateMember(member: Member): Observable<Member> {
        this.loading.show();

        this.members = this.members.map(m =>
            m.id === member.id ? { ...member } : m
        );

        return of(member).pipe(
            delay(700),
            finalize(() => this.loading.hide())
        );
    }

    deleteMember(id: number): Observable<boolean> {
        this.loading.show();

        this.members = this.members.filter(m => m.id !== id);

        return of(true).pipe(
            delay(600),
            finalize(() => this.loading.hide())
        );
    }
}
