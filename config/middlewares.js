module.exports = ({ env }) => {
  const connectSrc = [
    "'self'",
    'https:',
    ...env.array('ALLOWED_CONNECT_SRC', []),
  ];

  const corsOrigins = env.array('ALLOWED_CORS_ORIGINS', []);

  return [
    'strapi::errors',

    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': connectSrc,
          },
        },
      },
    },

    {
      name: 'strapi::cors',
      config: {
        enabled: true,
        origin: corsOrigins,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        headers: ['Content-Type', 'Authorization', 'Origin', 'Accept', '*'],
        keepHeaderOnError: true,
      },
    },

    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::favicon',
    'strapi::public',
  ];
};
