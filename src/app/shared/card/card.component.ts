import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cakap-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export default class CakapCard {
  @Input() image!: string;
  @Input() title!: string;
  @Input() topic!: string;
  @Input() logo!: string;
  @Input() logoName!: string;
  @Input() rating!: number;
  @Input() reviewTotal!: number;
  @Input() discount!: string;
  @Input() discountTotal!: string;
  @Input() price!: string;
  @Input() value!: unknown;

  @Output() onclick = new EventEmitter();

  onClick() {
    this.onclick.emit(this.value);
  }
}
