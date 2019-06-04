import uuidv4 from 'uuid/v4';

export default class Base64Helper {
  static generateUniqueString() {
    const g = uuidv4();
    let uniqueString = Buffer.from(g).toString('base64');
    uniqueString = uniqueString.replace('=', '');
    uniqueString = uniqueString.replace('+', '');
    return uniqueString;
  }

  static svgToBase64(data) {
    return data.toString('base64');
  }
}
