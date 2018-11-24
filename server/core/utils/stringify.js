/* eslint-disable no-bitwise */
class Stringify {
  // function for string->byteArray conversion
  static stringToByteArray(str) {
    const tmpStr = unescape(encodeURIComponent(str));
    const bytes = new Array(tmpStr.length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < str.length; ++i) { bytes[i] = tmpStr.charCodeAt(i); }
    return bytes;
  }
}

export default Stringify;
