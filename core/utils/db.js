export default class ConnectionStringBuilder {
  withUser(user) {
    this._user = user;
    return this;
  }

  withPassword(password) {
    this._password = password;
    return this;
  }

  withHost(host) {
    this._host = host;
    return this;
  }

  withDatabase(database) {
    this._database = database;
    return this;
  }

  build() {
    let dbConnectionString = 'mongodb://';

    if (this._user) {
      dbConnectionString += this._user;
    }

    if (this._password) {
      dbConnectionString += `:${this._password}`;
    }

    if (this._user) {
      dbConnectionString += '@';
    }

    dbConnectionString += this._host;

    if (this._database) {
      dbConnectionString += `/${this._database}`;
    }

    return dbConnectionString;
  }
}
