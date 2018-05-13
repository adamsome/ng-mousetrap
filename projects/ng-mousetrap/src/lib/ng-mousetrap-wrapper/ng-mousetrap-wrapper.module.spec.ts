import { NgMousetrapWrapperModule } from './ng-mousetrap-wrapper.module'

describe('NgMousetrapWrapperModule', () => {
  let ngMousetrapWrapperModule: NgMousetrapWrapperModule

  beforeEach(() => {
    ngMousetrapWrapperModule = new NgMousetrapWrapperModule()
  })

  it('should create an instance', () => {
    expect(ngMousetrapWrapperModule).toBeTruthy()
  })
})
