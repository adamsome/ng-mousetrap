import { Injectable } from '@angular/core'
import 'mousetrap'
import { NgMousetrapWrapperModule } from './ng-mousetrap-wrapper.module'

const PREVENT_IN = ['input', 'textarea', 'select']
const ALLOWED_CLASS_NAME = 'mousetrap'

@Injectable({
  providedIn: NgMousetrapWrapperModule,
})
export class NgMousetrapWrapperService {
  private mousetrap: MousetrapInstance

  constructor() {
    this.mousetrap = new (Mousetrap as any)()
    this.reset()
  }

  reset(): void {
    this.mousetrap.reset()
  }

  bind(
    keys: string | string[],
    callback: (e: KeyboardEvent, keys: string) => any,
    eventType?: string,
    allowIn: string | string[] = [],
  ): void {
    this.mousetrap.bind(
      keys,
      (event, combo) =>
        this.allowed(event, allowIn) ? callback(event, combo) : true,
      eventType,
    )
  }

  unbind(keys: string | string[], eventType?: string): void {
    this.mousetrap.unbind(keys, eventType)
  }

  trigger(keys: string, eventType?: string): void {
    this.mousetrap.trigger(keys, eventType)
  }

  private allowed(e: KeyboardEvent, allowIn: string | string[]): boolean {
    const target = e.target as HTMLElement
    const tag = target.nodeName.toLowerCase()
    const _allowIn = Array.isArray(allowIn) ? allowIn : [allowIn]
    return (
      target.className.includes(ALLOWED_CLASS_NAME) ||
      !PREVENT_IN.some(t => t === tag) ||
      _allowIn.map(a => a.toLowerCase()).some(t => t === tag)
    )
  }
}
