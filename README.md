# NgMouseTrap

Angular 6 Service that wraps [Mousetrap](https://craig.is/killing/mice#api.bind), a keyboard shortcut event capture library useful for implementing app-wide hotkeys.

Project was generated using Angular CLI version ^6.

See `src/app/app.component.ts` for example usage.

## Build

Run `ng build ng-mousetrap` to build the project. The build artifacts will be stored in the `projects/ng-mousetrap/dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test ng-mousetrap` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Sandbox development server

Run `ng serve` for a dev server of the sandbox sample app. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. The app simply imports the NgMouseTrap library, loads a sample configuration, and writes to the console when one of the configured keyboard shortcuts are pressed.
