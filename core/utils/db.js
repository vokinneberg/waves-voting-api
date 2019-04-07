export default class ConnectionStringBuilder {
  constructor(config) {
    this._config = config;
  }

  buildConneсtionString() {
    var dbConnectionString = 'mongodb://';

    if (this._config.dbUser) {
      dbConnectionString += this._config.dbUser;
    }

    if(this._config.dbPassword) {
      dbConnectionString += ':' + this._config.dbPassword;
    }

    if (this._config.dbUser ) {
      dbConnectionString += '@';
    }

    dbConnectionString += this._config.dbHost;

    if (this._config.dbName) {
      dbConnectionString += '/' + this._config.dbName;
    }

    return dbConnectionString;
  }
}