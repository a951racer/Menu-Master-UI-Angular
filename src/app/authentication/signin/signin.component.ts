import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  credentialsForm: FormGroup;
  labelPosition = 'before';

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SigninComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.credentialsForm = fb.group(data);
  }

  ngOnInit() {
  }

  signin() {
    this.dialogRef.close(this.credentialsForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
