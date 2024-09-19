import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { cantBeStrider } from '../../../shared/validators/validators';

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

  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name:  [ '', [ Validators.required ]],
    email: [ '', [ Validators.required ]],
    username:  [ '', [ Validators.required, cantBeStrider ]],
    password:  [ '', [ Validators.required, Validators.minLength(6) ]],
    password2: [ '', [ Validators.required, Validators.minLength(6) ]]
  })

  isValidField() {
    //TODO: obtener validation desde un servicio.
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
