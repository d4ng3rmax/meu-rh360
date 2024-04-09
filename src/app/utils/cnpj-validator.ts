import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CnpjValidator {
  static isValidCnpj(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cnpj = control.value ? control.value.replace(/\D/g, '') : '';
      if (!cnpj) return null; // Permite campo vazio. Use Validators.required para torná-lo obrigatório.

      if (cnpj.length !== 14) return { cnpjNotValid: true };

      let tamanhoTotal = cnpj.length - 2;
      let cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
      const digitosVerificadores = cnpj.substring(tamanhoTotal);
      let soma = 0;
      let pos = tamanhoTotal - 7;

      for (let i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2) pos = 9;
      }

      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitosVerificadores.charAt(0)) return { cnpjNotValid: true };

      tamanhoTotal += 1;
      cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
      soma = 0;
      pos = tamanhoTotal - 7;

      for (let i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2) pos = 9;
      }

      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitosVerificadores.charAt(1)) return { cnpjNotValid: true };

      return null; // CNPJ é válido
    };
  }
}
