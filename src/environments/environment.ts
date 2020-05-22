// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dragonsApiEndPoint: 'https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon',    // TODO: delete it
  usersApi: 'https://5ec45705628c160016e70fa0.mockapi.io/api/v1/movies/users',
  authApi: 'http://localhost:3000',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.