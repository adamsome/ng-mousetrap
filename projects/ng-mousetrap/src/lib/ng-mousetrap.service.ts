import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { NgMousetrapWrapperService } from './ng-mousetrap-wrapper'
import {
  NgMousetrapAction,
  NgMousetrapActionEvent,
  NgMousetrapConfig,
  NgMousetrapSectionConfig,
} from './ng-mousetrap.model'
import { NgMousetrapModule } from './ng-mousetrap.module'
import { flatten, values } from './util'

const ROOT_SECTION = '_root'

@Injectable({
  providedIn: NgMousetrapModule,
})
export class NgMousetrapService {
  private _actions = new Subject<NgMousetrapActionEvent>()
  actions: Observable<NgMousetrapActionEvent> = this._actions.asObservable()

  private cfg: NgMousetrapConfig
  private sections: Record<string, NgMousetrapSectionConfig>
  private sectionNames: string[]

  constructor(private mousetrap: NgMousetrapWrapperService) {
    this.reset()
  }

  addConfig(config: NgMousetrapConfig): void {
    this.mousetrap.reset()
    this.updateCfg(config)
  }

  setConfig(config: NgMousetrapConfig): void {
    this.reset()
    this.updateCfg(config)
  }

  reset(): void {
    this.mousetrap.reset()
    this.sections = { _root: { name: ROOT_SECTION, actions: [] } }
    this.sectionNames = [ROOT_SECTION]
  }

  bind(
    keys: string | string[],
    callback: (e: KeyboardEvent, keys: string) => any,
    section: string = ROOT_SECTION,
    eventType?: string,
    allowIn?: string | string[],
  ) {
    if (!this.sections[section]) {
      this.sections[section] = { name: section, actions: [] }
    }
    this.sections[section].actions.push({ keys, eventType, allowIn })
    this.mousetrap.bind(keys, callback, eventType, allowIn)
  }

  unbind(
    keys: string | string[],
    section: string = ROOT_SECTION,
    eventType?: string,
  ): void {
    this.sections[section].actions = this.sections[section].actions.filter(
      a => a.keys !== keys && a.eventType !== eventType,
    )
    this.mousetrap.unbind(keys, eventType)
  }

  trigger(keys: string, eventType?: string): void {
    this.mousetrap.trigger(keys, eventType)
  }

  private updateCfg(cfg: NgMousetrapConfig): void {
    this.updateSections(cfg)
    this.getUniqueActions().forEach(a =>
      this.mousetrap.bind(
        a.keys,
        this.raiseEvents(a).bind(this),
        a.eventType,
        a.allowIn,
      ),
    )
  }

  private updateSections(cfg: NgMousetrapConfig): void {
    if (cfg.actions) {
      this.sections[ROOT_SECTION].actions = this.sections[
        ROOT_SECTION
      ].actions.concat(cfg.actions)
    }
    if (cfg.sections) {
      for (let i = 0; i < cfg.sections.length; i++) {
        const cfgSection = cfg.sections[i]
        const section = this.sections[cfgSection.name]
        if (section) {
          this.sections[cfgSection.name].actions = section.actions.concat(
            cfgSection.actions,
          )
        } else {
          this.sections[cfgSection.name] = cfgSection
          this.sectionNames.push(cfgSection.name)
        }
      }
    }
  }

  private getUniqueActions(): NgMousetrapAction[] {
    // Get all actions from all sections
    const actionCfgs = flatten(
      values(this.sections).map(s => s.actions),
    ).filter(a => a.id)
    // Combine actions with identical keys and eventTypes into a single actions
    const actions = actionCfgs.reduce(
      (as, a) => {
        const uniq =
          (Array.isArray(a.keys) ? a.keys.join('|') : a.keys) + a.eventType
        if (as[uniq]) {
          as[uniq].ids.push(a.id)
        } else {
          as[uniq] = Object.assign({}, a, {
            ids: [a.id],
          }) as NgMousetrapAction
        }
        return as
      },
      {} as Record<string, NgMousetrapAction>,
    )
    return values(actions)
  }

  private raiseEvents(action: NgMousetrapAction) {
    return (event: KeyboardEvent, keys: string): boolean => {
      action.ids.forEach(id => this._actions.next({ id, event, keys }))
      return action.preventDefault ? false : true
    }
  }
}
