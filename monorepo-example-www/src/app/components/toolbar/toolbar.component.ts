import {Component, Input} from '@angular/core';
import {SessionModel} from '@monorepo-example/shared';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() session: SessionModel = null;

}
