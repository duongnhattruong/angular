# Installation
Video tutorial: https://www.youtube.com/watch?v=-cdk3hJP8uQ (note: use `npm i @angular/cli@16.1.8` instead of `npm i @angular/cli`)

Step 1: Install NodeJs - Recommend using LTS version
https://nodejs.org/en/download/prebuilt-installer/current

Step 2: Clone this project

Step 3: Inside project's terminal:
`npm i @angular/cli@16.1.8`
`npm install`

Step 4: Go to `environment.ts` file:
Edit the apiUrl address to match the backend api address.
Angular will use this address to call your api.

Step 5: Run
`npm start` 
Navigate to  `http://localhost:4200/` for application.

# Practice

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
