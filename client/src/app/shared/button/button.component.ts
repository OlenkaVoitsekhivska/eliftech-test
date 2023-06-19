import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public label: string = '';
  @Input() public type: 'primary' | 'accent' = 'primary';
  @Input() public disabled = false;
  @Output() public customClick: EventEmitter<any> = new EventEmitter();

  public handleClick(label: string) {
    this.customClick.emit(label);
  }
}
