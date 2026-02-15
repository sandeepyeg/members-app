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

  selectedMember?: Member;
  expiredOnly = signal(false);
  showAddModal = signal(false);
  members = signal<Member[]>([]);
  searchTerm = signal('');
  editingMember = signal<Member | null>(null);

  constructor(private memberService: MemberService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  onSelect(member: Member) {
    this.selectedMember = member;
  }

  loadMembers(): void {
    this.memberService.getMembers()
      .subscribe(m => this.members.set(m));
  }

  onSaved(member: Member) {

    const request = member.id
      ? this.memberService.updateMember(member)
      : this.memberService.createMember(member);

    request.subscribe(() => {
      this.showAddModal.set(false);
      this.editingMember.set(null);
      this.loadMembers();

      this.toastService.show(
        member.id ? 'Member updated' : 'Member added',
        'success'
      );
    });
  }
  onDelete(member: Member) {
    if (!confirm(`Delete ${member.name}?`)) return;

    this.memberService.deleteMember(member.id).subscribe(() => {
      this.loadMembers();
      this.toastService.show('Member deleted', 'success');
    });
  }

  onEdit(member: Member) {
    this.editingMember.set(member);
    this.showAddModal.set(true);
  }
  closeModal(form?: any) {
    this.showAddModal.set(false);
    this.editingMember.set(null);

    if (form?.form) {
      form.form.reset();
    }
  }


  filteredMembers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const expiredOnly = this.expiredOnly();
    const list = this.members();

    return list.filter(m => {

      const matchesSearch =
        !term ||
        m.name.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term);

      const isExpired =
        new Date(m.expiryDate) < new Date();

      const matchesExpired =
        !expiredOnly || isExpired;

      return matchesSearch && matchesExpired;
    });
  });
}
