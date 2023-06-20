import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[setAttribute]',
})
export class SetAttributeDirective implements OnInit {
  @Input('setAttribute') label: string = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.setAttributes();
  }

  private setAttributes() {
    const nativeElement = this.elementRef.nativeElement;
    console.log('DIRECTIVE HERE');
    const label = this.label.toLowerCase();
    if (label.includes('email')) {
      nativeElement.setAttribute('disabled', 'true');
      console.log('EMAIL NATIVE ELEMENT', nativeElement);
    }
    if (label.includes('phone')) {
      nativeElement.setAttribute('tel', 'true');
      console.log('PHONE NATIVE ELEMENT', nativeElement);
    }
  }
}
