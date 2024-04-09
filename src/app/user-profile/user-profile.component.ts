import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CpfValidator } from '../utils/cpf-validator';
import { CnpjValidator } from '../utils/cnpj-validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userName: string = '';
  isModalOpen = false;

  companyForm: FormGroup = new FormGroup({
    companyType: new FormControl(''),
    companyName: new FormControl(''),
    companyCNPJ: new FormControl(''),
    companyCEP: new FormControl(''),
    companyAddress: new FormControl(''),
    companyNeighborhood: new FormControl(''),
    companyState: new FormControl(''),
    companyCity: new FormControl(''),
    companyComplement: new FormControl(''),
    adminCel: new FormControl(''),
    adminName: new FormControl(''),
    adminCPF: new FormControl(''),
    companyEmail: new FormControl('')
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
      companyType: [''],
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      companyCNPJ: ['', [Validators.required, CnpjValidator.isValidCnpj()]],
      companyCEP: [''],
      companyAddress: [''],
      companyNeighborhood: [''],
      companyState: [''],
      companyCity: [''],
      companyComplement: [''],
      companyEmail: ['', [Validators.required, Validators.email]],
      adminCel: ['', [Validators.required, Validators.minLength(8)]],
      adminName: ['', [Validators.required, Validators.minLength(5)]],
      adminCPF: ['', [Validators.required, CpfValidator.isValidCpf()]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.companyForm.controls;
  }

  getFirstName(fullName: string): string {
    return fullName.split(' ')[0];
  }

  abrirModalConfiguracao() {
    this.isModalOpen = true;
  }

  fecharModal(event: MouseEvent) {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    this.submitted = true;

    console.log('status form:', this.companyForm.invalid)
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
