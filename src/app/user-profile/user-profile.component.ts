import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userName: string = '';
  isModalOpen = false;

  companyForm: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    const shortName = userData.fullname || '';
    this.userName = this.getFirstName(shortName);
    // console.log(userData);

    // popup:

    this.companyForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      companyCNPJ: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      companyPhone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      adminName: ['', [Validators.required]],
      adminCPF: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      companyEmail: ['', [Validators.required, Validators.email]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.companyForm.controls;
  }

  getFirstName(fullName: string): string {
    return fullName.split(' ')[0];
  }

  iniciarConfiguracao() {
    this.isModalOpen = true;
  }

  fecharModal(event: MouseEvent) {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.companyForm.invalid) {
      return;
    } else {
      //
    }

    console.log(this.companyForm.value);
  }

  onReset(): void {
    this.submitted = false;
    this.companyForm.reset();
  }

}
