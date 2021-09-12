import getEnvVariable from '../helpers/getEnvVariable.js';

const environment = process.env.NODE_ENV || 'development';

export default {
    releaseHash: getEnvVariable('RAZZLE_RELEASE_HASH'),
    releaseDate: getEnvVariable('RAZZLE_RELEASE_DATE', 'dev'),
    environment,
    isProduction: environment === 'production',
    supportEmail: 'support@metics.io',
    appUrl: 'https://www.metics.io',
    appName: 'Metics',
    appNameDomain: 'metics.io',
    isServerSide: typeof window === 'undefined',
};
