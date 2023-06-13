import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() type: 'primary' | 'accent' = 'primary';
  @Output() customClick: EventEmitter<any> = new EventEmitter();

  handleClick(label: string) {
    console.log('I have been clicked');
    this.customClick.emit(label);
  }
}
