import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import Inputmask from 'inputmask';

@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective implements OnInit {

  @Input() appCpfMask: any;

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    new Inputmask({
      mask: this.appCpfMask,
      skipOptionalPartCharacter: ' '
    }).mask(this.element.nativeElement);
  }

}
