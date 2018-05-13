import { TestBed, inject } from '@angular/core/testing'
import { NgMousetrapWrapperService } from './ng-mousetrap-wrapper'
import { NgMousetrapConfig } from './ng-mousetrap.model'
import { NgMousetrapService } from './ng-mousetrap.service'

describe('NgMousetrapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgMousetrapService, NgMousetrapWrapperService],
    })
  })

  it(
    'should be created',
    inject([NgMousetrapService], (service: NgMousetrapService) => {
      expect(service).toBeTruthy()
    }),
  )

  it(
    'should have config sections set',
    inject([NgMousetrapService], (service: NgMousetrapService) => {
      service.addConfig(config)
      const sections = service['sections']
      const sectionRoot = sections['_root']
      const sectionA = sections['Section A']
      expect(sectionRoot.actions[0].id).toBe('comp-b.4-command')
      expect(sectionRoot.actions[0].keys).toBe('4')
      expect(sectionRoot.actions[1].eventType).toBe('keyup')
      expect(sectionRoot.actions[1].description).toBe('B-X Command')
      expect(sectionA.actions[0].keys).toBe('x')
      expect(sectionA.actions[1].keys[1]).toBe('ctrl+k')
      expect(sectionA.actions[1].preventDefault).toBe(true)
    }),
  )

  it(
    'should have 3 unique actions',
    inject([NgMousetrapService], (service: NgMousetrapService) => {
      service.addConfig(config)
      const uniqActions = service['getUniqueActions']()
      expect(uniqActions.length).toBe(3)
    }),
  )

  it(
    'should remove actions on reset',
    inject([NgMousetrapService], (service: NgMousetrapService) => {
      service.addConfig(config)
      service.reset()
      const sections = service['sections']
      const sectionRoot = sections['_root']
      expect(sectionRoot.actions.length).toBe(0)
    }),
  )

  it(
    'should add and remove sections on bind & unbind',
    inject([NgMousetrapService], (service: NgMousetrapService) => {
      service.bind('y', () => {})
      service.bind('x', () => {}, 'newSection', 'xxx')
      const sections = service['sections']
      const sectionRoot = sections['_root']
      const sectionNew = sections['newSection']
      expect(sectionRoot.actions[0].keys).toBe('y')
      expect(sectionNew.actions.length).toBe(1)
      expect(sectionNew.actions[0].keys).toBe('x')
      service.bind('z', () => {}, 'newSection')
      expect(sectionNew.actions[1].keys).toBe('z')
      service.unbind('x', 'newSection', 'xxx')
      expect(sectionNew.actions[0].keys).toBe('z')
    }),
  )
})

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
