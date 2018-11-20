import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SessionModel} from '@monorepo-example/shared';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() session: SessionModel = null;
  @Output() onHome: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSignout: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSignin: EventEmitter<void> = new EventEmitter<void>();

  public doHome(): void {
    this.onHome.emit();
  }

  public doSignout(): void {
    this.onSignout.emit();
  }

  public doSignin(): void {
    this.onSignin.emit();
  }

}
