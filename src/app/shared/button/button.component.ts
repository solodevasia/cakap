import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cakap-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export default class CakapButton {
  @Input() id!: string;
  @Input() name!: string;
  @Input() classes!: string;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() onclick = new EventEmitter();

  onClick() {
    this.onclick.emit();
  }
}
