export interface NgMousetrapConfig {
  actions?: NgMousetrapActionConfig[]
  sections?: NgMousetrapSectionConfig[]
}

export interface NgMousetrapSectionConfig {
  name: string
  actions: NgMousetrapActionConfig[]
}

export interface NgMousetrapActionConfig {
  id?: string
  keys: string | string[]
  description?: string
  eventType?: string
  preventDefault?: boolean
  allowIn?: string | string[]
}

export interface NgMousetrapAction {
  ids: string[]
  keys: string | string[]
  eventType?: string
  preventDefault?: boolean
  allowIn?: string | string[]
}

export interface NgMousetrapActionEvent {
  id: string
  keys: string | string[]
  event: KeyboardEvent
}
