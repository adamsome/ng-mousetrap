import { TestBed, inject } from '@angular/core/testing'
import { NgMousetrapWrapperService } from './ng-mousetrap-wrapper.service'

describe('NgMousetrapWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgMousetrapWrapperService],
    })
  })

  it(
    'should be created',
    inject(
      [NgMousetrapWrapperService],
      (service: NgMousetrapWrapperService) => {
        expect(service).toBeTruthy()
      },
    ),
  )

  it(
    'should have mousetrap member',
    inject(
      [NgMousetrapWrapperService],
      (service: NgMousetrapWrapperService) => {
        expect(service['mousetrap']).toBeTruthy()
      },
    ),
  )
})
