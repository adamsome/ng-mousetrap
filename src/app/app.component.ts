import { Component } from '@angular/core'
import {
  NgMousetrapActionEvent,
  NgMousetrapConfig,
  NgMousetrapService,
} from 'ng-mousetrap'

const config: NgMousetrapConfig = {
  actions: [
    {
      id: 'comp-b.4-command',
      keys: '4',
    },
    {
      id: 'comp-b.x-command',
      keys: 'x',
      description: 'B-X Command',
      eventType: 'keyup',
    },
  ],
  sections: [
    {
      name: 'Section A',
      actions: [
        {
          id: 'comp-a.x-command',
          keys: 'x',
          description: 'X Command',
          eventType: 'keyup',
        },
        {
          id: 'comp-a.meta-k-command',
          keys: ['command+k', 'ctrl+k'],
          preventDefault: true,
        },
      ],
    },
  ],
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app'

  constructor(private mousetrap: NgMousetrapService) {
    mousetrap.addConfig(config)
    mousetrap.actions.subscribe(a => this.onAction(a))
  }

  onAction(action: NgMousetrapActionEvent) {
    console.log('action', action)
    if (action.id === 'comp-a.x-command') {
      console.log('x-command')
    } else if (action.id === 'comp-a.meta-k-command') {
      console.log('meta-k-command')
    }
  }
}
