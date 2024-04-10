import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  companyData: any;

  titleMap: { [key: string]: string } = {
    companyType: 'Tipo da Empresa',
    companyName: 'Nome da Empresa',
    companyCNPJ: 'CNPJ',
    companyCEP: 'CEP',
    companyAddress: 'Endereço',
    companyNeighborhood: 'Bairro',
    companyState: 'Estado',
    companyCity: 'Cidade',
    companyComplement: 'Complemento',
    companyEmail: 'E-mail da Empresa',
    adminCel: 'Celular do Administrador',
    adminName: 'Nome do Administrador',
    adminCPF: 'CPF do Administrador'
  };

  ngOnInit(): void {
    const storedData = sessionStorage.getItem('companyData');
    this.companyData = storedData ? JSON.parse(storedData) : {};
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
