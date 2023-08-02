// It would be nice to import each environment's config from its own file,
// but then the unused configs would still appear in the minified output.

const PRD_CONFIG = {
  ENVIRONMENT_NAME: 'Production',
  CLIMATE_SAVER_API_URL: 'TODO',
};

const STG_CONFIG = {
  ENVIRONMENT_NAME: 'Staging',
  CLIMATE_SAVER_API_URL: 'https://api-stg-ugevrs7yga-uw.a.run.app',
};

const DEV_CONFIG = {
  ENVIRONMENT_NAME: 'LocalDevelopment',
  CLIMATE_SAVER_API_URL: 'http://localhost:1338',
};

/**
 * Exports a config object customized for the appropriate deploy environment,
 * as selected at compile time by the REACT_APP_ENV environment variable.
 */
const selectEnvironment = function () {
  // Environment variables beginning with REACT_APP are made available in JavaScript.
  // Furthermore, they are defined at compile time, so all configs but the correct one
  // can be eliminated statically from the minified output.
  switch (process.env.REACT_APP_ENV) {
    case 'prd':
      return PRD_CONFIG;
    case 'stg':
      return STG_CONFIG;
    case 'dev':
      return DEV_CONFIG;
    default:
      throw Error('Unexpected value for REACT_APP_ENV: ' + process.env.REACT_APP_ENV);
  }
};

const config: any = selectEnvironment();

/** * Returns true if this is the production environment. */
config.isPrd = config.ENVIRONMENT_NAME === 'Production';

/** Returns true if this is the staging environment. */
config.isStg = config.ENVIRONMENT_NAME === 'Staging';

/** Returns true if this is the local development environment. */
config.isDev = config.ENVIRONMENT_NAME === 'Development';

export default config;
