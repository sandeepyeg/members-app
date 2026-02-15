import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { futureDateValidator } from '../validators/member.validators';
import { MemberService } from '../../services/member.service';
import { share } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.scss'
})
export class MemberFormComponent implements OnInit {
  @Output() saved = new EventEmitter<Member>();
  @Input() member?: Member;

  @Output() cancel = new EventEmitter<void>();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    membershipType: ['Basic', Validators.required],
    expiryDate: ['', [Validators.required, futureDateValidator]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.member) {
      this.form.patchValue(this.member);
    }
  }

  submit() {
    if (this.form.invalid) return;

    const value = {
      ...this.member,
      ...this.form.value
    };

    this.saved.emit(value as Member);
  }

  resetForm() {
    this.form.reset({
      membershipType: 'Basic'
    });
  }
}
