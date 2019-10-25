import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  public searchForm: FormGroup = new FormGroup({
    id: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$')
      ]
    )
  });

  public constructor(private router: Router) {}

  public onFormSubmit(): void {
    const chosenId: number = this.searchForm.get('id').value;

    this.router.navigate([chosenId]);
  }
}
