import { ChangeDetectionStrategy, Component, OnInit, signal, computed } from '@angular/core';
import { Member } from '../../models/member.model';
import { MemberService } from '../../services/member.service';
import { MemberDetailsComponent } from '../../components/member-details/member-details.component';
import { MembersListComponent } from '../../components/members-list/members-list.component';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-members-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MembersListComponent, MemberDetailsComponent, SharedModule],
  templateUrl: './members-page.component.html',
  styleUrl: './members-page.component.scss'
})
export class MembersPageComponent implements OnInit {

  selectedMember?: Member;

  members = signal<Member[]>([]);
  searchTerm = signal('');

  constructor(private memberService: MemberService) { }

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
    this.selectedMember = member;
    this.memberService.updateMember(member).subscribe(() => {
      this.loadMembers();
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
