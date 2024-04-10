import { Component, OnInit } from '@angular/core';
import { LoggedService } from '../utils/logged.service';
import { ViacepService } from '../utils/viacep.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CpfValidator } from '../utils/cpf-validator';
import { CnpjValidator } from '../utils/cnpj-validator';
import { estadosCidades } from '../data/estados-cidades.data';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userName: string = '';
  isModalOpen = false;
  isValidated = false;
  estados = Object.keys(estadosCidades);
  cidades: string[] = [];

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

  constructor(
    private LoggedService: LoggedService,
    private formBuilder: FormBuilder,
    private viacepService: ViacepService
  ) { }

  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    const companyData = JSON.parse(sessionStorage.getItem('companyData') || '{}');
    const shortName = userData.fullname || '';
    this.isValidated = this.LoggedService.isValidated();
    this.userName = this.getFirstName(shortName);

    this.companyForm = this.formBuilder.group({
      companyType: [companyData['companyType'] || ''],
      companyName: [companyData['companyName'] || '', [Validators.required, Validators.minLength(3)]],
      companyCNPJ: [companyData['companyCNPJ'] || '', [Validators.required, CnpjValidator.isValidCnpj()]],
      companyCEP: [companyData['companyCEP'] || ''],
      companyAddress: [companyData['companyAddress'] || ''],
      companyNeighborhood: [companyData['companyNeighborhood'] || ''],
      companyState: [companyData['companyState'] || ''],
      companyCity: [companyData['companyCity'] || ''],
      companyComplement: [companyData['companyComplement'] || ''],
      companyEmail: [companyData['companyEmail'] || '', [Validators.required, Validators.email]],
      adminCel: [companyData['adminCel'] || '', [Validators.required, Validators.minLength(8)]],
      adminName: [companyData['adminName'] || '', [Validators.required, Validators.minLength(5)]],
      adminCPF: [companyData['adminCPF'] || '', [Validators.required, CpfValidator.isValidCpf()]]
    });

    this.companyForm.get('companyState')!.valueChanges.subscribe(estado => {
      this.cidades = estadosCidades[estado as keyof typeof estadosCidades] || [];
      this.companyForm.get('companyCity')?.reset();
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.companyForm.controls;
  }

  getFirstName(fullName: string): string {
    return fullName.split(' ')[0];
  }

  buscarCep(): void {
    const cep = this.companyForm.get('companyCEP')?.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep && cep.length === 8) { // Verifica se o CEP tem 8 dígitos
      this.viacepService.buscarCep(cep).subscribe(dados => {
        if (dados && !dados.erro) {
          // console.log(dados)
          this.companyForm.patchValue({
            companyAddress: dados.logradouro,
            companyNeighborhood: dados.bairro
          });
          const estado = dados.uf;
          this.companyForm.get('companyState')!.setValue(estado);
          this.cidades = estadosCidades[estado as keyof typeof estadosCidades];
          // console.log('this.cidades', this.cidades);

          const cidade = dados.localidade;
          this.companyForm.get('companyCity')!.setValue(cidade);
        } else {
          console.error('CEP não encontrado ou erro na resposta');
        }
      }, error => {
        console.error('Erro na consulta do CEP', error);
      });
    }
  }

  abrirModalConfiguracao() {
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
      const formData = { ...this.companyForm.value };
      formData.menuValidated = true;
      sessionStorage.setItem('companyData', JSON.stringify(formData));
      this.isModalOpen = false;
      window.location.reload();
    }
  }

  onReset(): void {
    this.submitted = false;
    this.companyForm.reset();
  }

}
