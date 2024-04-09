import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import Inputmask from 'inputmask';

@Directive({
  selector: '[appCellphoneMask]' // Ajuste o seletor para diferenciar da diretiva de CPF
})
export class CelMaskDirective implements OnInit {

  @Input() appCellphoneMask: any; // Recebe a máscara por input ou define uma padrão

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    const maskPattern = this.appCellphoneMask || '(99) 99999-9999';
    new Inputmask({
      mask: maskPattern,
      placeholder: '_', // Define um placeholder se necessário
      showMaskOnHover: false,
      clearIncomplete: false,
    }).mask(this.element.nativeElement);
  }
}
