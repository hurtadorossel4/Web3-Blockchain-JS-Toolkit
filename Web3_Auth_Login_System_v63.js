// Web3钱包登录系统（钱包签名验证/链上身份认证）
const crypto = require('crypto');

class Web3AuthLoginSystem {
  generateAuthMessage(address) {
    const nonce = crypto.randomBytes(16).toString('hex');
    return `Sign to login Web3 DApp\nAddress: ${address}\nNonce: ${nonce}`;
  }

  // 验证登录签名
  verifyLoginSignature(address, signature, message) {
    // 模拟验证逻辑
    const isValid = signature.length === 130 && address.startsWith('0x');
    return {
      address,
      authStatus: isValid ? 'logged_in' : 'signature_invalid',
      timestamp: new Date().toISOString()
    };
  }
}

const auth = new Web3AuthLoginSystem();
const testAddr = '0x789abcdef0123456789abcdef0123456789abcd';
const msg = auth.generateAuthMessage(testAddr);
console.log('✅ 登录消息:', msg);
console.log('✅ 验证结果:', auth.verifyLoginSignature(testAddr, crypto.randomBytes(65).toString('hex'), msg));
module.exports = Web3AuthLoginSystem;
