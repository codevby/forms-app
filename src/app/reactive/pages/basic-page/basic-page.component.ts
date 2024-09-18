import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 21
}

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent implements OnInit {

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.myForm.reset( rtx5090 );
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
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

  // public myForm: FormGroup = new FormGroup({
  //   name:      new FormControl(''),
  //   price:     new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    price: [0, [ Validators.required, Validators.min(0) ] ],
    inStorage: [0, [ Validators.required, Validators.min(0) ] ],
  });

  onSave():void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price: 10, inStorage: 0 });

  }

}
