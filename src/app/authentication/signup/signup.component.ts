import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  credentialsForm: FormGroup;
  labelPosition = 'before';

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<SignupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.credentialsForm = fb.group(data);
  }

  ngOnInit() {
  }

  signup() {
    this.dialogRef.close(this.credentialsForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
