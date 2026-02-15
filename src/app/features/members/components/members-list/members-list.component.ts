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
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalCount: number = 0;

  @Output() selectMember = new EventEmitter<Member>();
  @Output() edit = new EventEmitter<Member>();
  @Output() delete = new EventEmitter<Member>();
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

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
