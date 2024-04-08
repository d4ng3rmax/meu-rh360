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
    companyName: new FormControl(''),
    companyCNPJ: new FormControl(''),
    companyCEP: new FormControl(''),
    companyAddress: new FormControl(''),
    companyNeighborhood: new FormControl(''),
    companyState: new FormControl(''),
    companyCity: new FormControl(''),
    companyComplement: new FormControl(''),
    companyEmail: new FormControl(''),
    companyPhone: new FormControl(''),
    adminName: new FormControl(''),
    adminCPF: new FormControl('')
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
      companyCNPJ: ['', [Validators.required, Validators.minLength(14)]],
      companyEmail: ['', [Validators.required, Validators.email]],
      // companyPhone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      companyPhone: ['', [Validators.required, Validators.minLength(11)]],
      adminName: ['', [Validators.required]],
      adminCPF: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
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
