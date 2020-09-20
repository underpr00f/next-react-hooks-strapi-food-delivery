module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        srv: env.bool('DATABASE_SRV', false),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', 'strapistable'),
        username: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapipass'),
        // uri: `mongodb+srv://${env('DATABASE_USERNAME')}:${env('DATABASE_PASSWORD')}@${env('DATABASE_HOST')}/${env('DATABASE_NAME')}?retryWrites=true&w=majority`,
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', ''),
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  },
});
