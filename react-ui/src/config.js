let APP_HOST_SERVER = null;
if (process.env.APP_HOST_SERVER) {
  APP_HOST_SERVER = process.env.APP_HOST_SERVER;
} else {
  APP_HOST_SERVER = "http://51.79.159.7:8080";
}

const config = {
    // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    pageSize: 7,
    APP_HOST_SERVER: APP_HOST_SERVER,
    ITEM_SERVER_HOST: APP_HOST_SERVER+'/content',
    AUTH_SERVER_HOST: APP_HOST_SERVER+'/auth',
    CRM_SERVER_HOST: APP_HOST_SERVER+'/crm',
    ORDERING_SERVER_HOST: APP_HOST_SERVER+'/ordering',
    PAYMENT_SERVER_HOST: APP_HOST_SERVER+'/payment',
    resourseUrl: (clientUrl)=>{
      return clientUrl.startsWith('/')?  config.ITEM_SERVER_HOST+clientUrl : config.ITEM_SERVER_HOST+'/'+clientUrl;
    }
};

export default config;
