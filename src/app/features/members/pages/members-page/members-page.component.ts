import { ChangeDetectionStrategy, Component, OnInit, signal, computed, Output, EventEmitter } from '@angular/core';
import { Member } from '../../models/member.model';
import { MemberService } from '../../services/member.service';
import { MemberDetailsComponent } from '../../components/member-details/member-details.component';
import { MembersListComponent } from '../../components/members-list/members-list.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MemberFormComponent } from '../../components/member-form/member-form.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-members-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MembersListComponent, MemberDetailsComponent, SharedModule, MemberFormComponent],
  templateUrl: './members-page.component.html',
  styleUrl: './members-page.component.scss'
})
export class MembersPageComponent implements OnInit {

  selectedMember = signal<Member | null>(null);
  editingMember = signal<Member | null>(null);
  showAddModal = signal(false);

  // Data
  members = signal<Member[]>([]);
  totalCount = signal(0);

  // State
  currentPage = signal(1);
  pageSize = 10;
  searchTerm = signal('');
  expiredOnly = signal(false);

  constructor(
    private memberService: MemberService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers(
      this.currentPage(),
      this.pageSize,
      this.searchTerm(),
      this.expiredOnly()
    ).subscribe(result => {
      this.members.set(result.items);
      this.totalCount.set(result.totalCount);
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadMembers();
  }

  onSearchChange(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1); // Reset to first page
    this.loadMembers();
  }

  onExpiredFilterChange(expired: boolean) {
    this.expiredOnly.set(expired);
    this.currentPage.set(1);
    this.loadMembers();
  }

  onSelect(member: Member) {
    this.selectedMember.set(member);
  }

  onSaved(memberData: Member) {
    const dto = {
      name: memberData.name,
      email: memberData.email,
      membershipType: memberData.membershipType,
      expiryDate: memberData.expiryDate
    } as any; // Cast to avoid strict type checks temporarily, strictly should be CreateMemberDto | UpdateMemberDto

    const request = memberData.id
      ? this.memberService.updateMember(memberData.id, dto)
      : this.memberService.createMember(dto);

    request.subscribe({
      next: () => {
        this.showAddModal.set(false);
        this.editingMember.set(null);
        this.loadMembers();
        this.toastService.show(memberData.id ? 'Member updated' : 'Member added', 'success');
      },
      error: () => {
        // Error handled by interceptor
      }
    });
  }

  onDelete(member: Member) {
    if (!confirm(`Delete ${member.name}?`)) return;

    this.memberService.deleteMember(member.id).subscribe(() => {
      this.loadMembers();
      this.toastService.show('Member deleted', 'success');
      // If page becomes empty, go back one page
      if (this.members().length === 0 && this.currentPage() > 1) {
        this.currentPage.update(p => p - 1);
        this.loadMembers();
      }
    });
  }

  onEdit(member: Member) {
    this.editingMember.set(member);
    this.showAddModal.set(true);
  }

  closeModal(form?: any) {
    this.showAddModal.set(false);
    this.editingMember.set(null);
    if (form?.form) form.form.reset();
  }
}
