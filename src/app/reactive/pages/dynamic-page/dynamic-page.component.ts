import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name: ['', Validators.required, Validators.minLength(3)],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['GTA V', Validators.required],
    ])
  })

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  isValidFieldinArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
    && formArray.controls[index].touched;
  }

  getFieldError( field: string ): string | null {

    if ( this.myForm.controls[field] && !this.myForm.controls[field].errors ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors[key].requiredLength} caracteres`;

      }
    }
    return null;

  }

  onSubmit():void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
  }


}
