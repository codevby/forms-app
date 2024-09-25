import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private validatorService = inject( ValidatorsService );

  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name:  [ '', [ Validators.required, Validators.pattern( this.validatorService.firstNameAndLastnamePattern ) ]],
    email: [ '', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ], [ new EmailValidatorService() ]],
    username:  [ '', [ Validators.required, this.validatorService.cantBeStrider ]],
    password:  [ '', [ Validators.required, Validators.minLength(6) ]],
    password2: [ '', [ Validators.required, Validators.minLength(6) ]]
  }, {
    Validators: [
      this.validatorService.isFieldOneEqualFieldTo( 'password', 'password2' ),
    ]
  });

  isValidField( field: string ): boolean | null {
    return this.validatorService.isValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
