import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { MemberService } from '../../services/member.service';

export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const selected = new Date(control.value);
    const today = new Date();

    return selected > today ? null : { pastDate: true };
}
export function emailUniqueValidator(service: MemberService): AsyncValidatorFn {
    return async (control) => {
        if (!control.value) return null;

        const taken = await service.isEmailTaken(control.value);
        return taken ? { emailTaken: true } : null;
    };
}
