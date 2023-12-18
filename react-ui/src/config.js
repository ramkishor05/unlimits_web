let APP_HOST_SERVER = null;
if (process.env.APP_HOST_SERVER) {
  APP_HOST_SERVER = process.env.APP_HOST_SERVER;
} else {
  APP_HOST_SERVER = "192.168.29.222";
}

const config = {
    // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    APP_HOST_SERVER: APP_HOST_SERVER,
    ITEM_SERVER_HOST: 'http://'+APP_HOST_SERVER+':4444',
    AUTH_SERVER_HOST: 'http://'+APP_HOST_SERVER+':2222',
    CRM_SERVER_HOST: 'http://'+APP_HOST_SERVER+':3333'
};

export default config;
