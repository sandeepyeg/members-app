import { Component, Input } from '@angular/core';
import { Member } from '../../models/member.model';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [DatePipe, CommonModule, SharedModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss'
})
export class MemberDetailsComponent {
  @Input() member?: Member;
  isExpired(date: string): boolean {
    return new Date(date) < new Date();
  }

}
