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

  filteredMembers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const list = this.members();

    if (!term) return list;

    return list.filter(m =>
      m.name.toLowerCase().includes(term)
    );
  });
}
