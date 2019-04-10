import uuidv4 from 'uuid/v4';

export default class Base64Helper {
  generateUniqueString() {
    const g = uuidv4();
    var uniqueString = Buffer.from(g).toString('base64')
    uniqueString= uniqueString.replace('=','');
    uniqueString = uniqueString.replace('+','');
    return uniqueString;
  }
}
