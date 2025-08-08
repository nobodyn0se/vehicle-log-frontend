# Vehicle Diagnostics Log Dashboard

This dashboard shows vehicle diagnostics log data stored in Cassandra DB to the end user. Data can be filtered by a combo of vehicle ID, error code and date ranges. The backend service code is available at https://github.com/nobodyn0se/vehicle-log-backend.

## Setup
Clone the repo using `git clone https://github.com/nobodyn0se/vehicle-log-frontend.git`

Navigate to the root folder with `cd vehicle-log-frontend`

Run `npm install`

For pnpm, run `pnpm install`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Todos
- Stylize and make the page fully responsive
- Enhance table cell styling
- Paginate data on the frontend
