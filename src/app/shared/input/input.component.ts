import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cakap-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export default class CakapInput {
  @Input() id!: string;
  @Input() name!: string;
  @Input() classes!: string;
  @Input() inputClasses!: string;
  @Input() type = 'text';
  @Input() controls: FormControl = new FormControl();
  @Input() placeholder = 'Placeholder';

  @Output() onenter = new EventEmitter();

  onEnter() {
    this.onenter.emit(null);
  }
}
