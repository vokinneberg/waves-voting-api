import { should } from 'chai';
import Base64Helper from '../../../core/utils/base64';

should();

describe('Base64Helper', () => {
  describe('generateUniqueString', () => {
    it('Should return unique bas64 string', () => {
      const base64StringOne = Base64Helper.generateUniqueString();
      const base64StringTwo = Base64Helper.generateUniqueString();
      const base64StringTree = Base64Helper.generateUniqueString();
      base64StringOne.should.not.be.equal(base64StringTwo);
      base64StringTwo.should.not.be.equal(base64StringTree);
      base64StringTree.should.not.be.equal(base64StringOne);
    });
  });
});
