import { Component, Input } from '@angular/core';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss'
})
export class MemberDetailsComponent {
  @Input() member?: Member;

}
