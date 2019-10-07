// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  CLIENT_ID: 'ng-zero',
  ROLE_PREFIX: 'role_',
  BASE_REST_URI: 'https://dev.thalasoft.com:8443/api',
  KEYCLOAK_URI: 'https://dev.thalasoft.com:8180/auth',
  KEYCLOAK_REALM: 'learnintouch',
  KEYCLOAK_CLIENTID: 'learnintouch-js'
};
