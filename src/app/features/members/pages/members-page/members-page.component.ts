import { ChangeDetectionStrategy, Component, OnInit, signal, computed } from '@angular/core';
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
    this.memberService.createMember(member).subscribe(() => {
      this.showAddModal.set(false);
      this.loadMembers();
      this.toastService.show('Member added successfully!', 'success');
    });
  }
  closeModal(form: any) {
    this.showAddModal.set(false);
    form.resetForm();
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
