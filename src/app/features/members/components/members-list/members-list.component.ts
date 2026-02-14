import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '../../models/member.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersListComponent {

  @Input() members: Member[] = [];
  @Output() selectMember = new EventEmitter<Member>();

  select(member: Member) {
    this.selectMember.emit(member);
  }

  trackById(index: number, member: Member): number {
    return member.id;
  }

  isExpired(date: string): boolean {
    return new Date(date) < new Date();
  }
}
