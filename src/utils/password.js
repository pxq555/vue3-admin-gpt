import JSEncrypt from "jsencrypt";

export function formatTest(pass) {
  if (pass.length < 8 || pass.length > 16) {
    return {err:true,msg:'密码长度为8~16位'};
  }

  var patternNum = /\d+/; //数字
  var patternLetterUp = /[a-zA-Z]+/; // 字母
  var patternLetterLow = /[a-z]+/; // 字母
  var patternFuhao = /[!@%^*、‘+=-\\.]+/; // 特殊符号
  var patternhanzi = /[\u4e00-\u9fa5]+/; // 汉字
  var patternFuhaoNo = /[';<>$&#()\\s]+/; // 不含字符
  var patternFour = /([\s\S])(\1){3,}/; //不可连续四位相同
  if (
    !patternNum.test(pass) ||
    !patternLetterUp.test(pass)
    // !patternLetterLow.test(pass) ||
    // !patternFuhao.test(pass)
  ) {
    return { err: true, msg: "密码需包含数字、字母" };
  }
  // if (patternFour.test(pass)) {
  //   return { err: true, msg: "密码含有过多连续字符" };
  // }
  // if (patternFuhaoNo.test(pass)) {
  //   return { err: true, msg: "密码含有非法字符" };
  // }
  if (patternhanzi.test(pass)) {
    return { err: true, msg: "密码不可使用汉字" };
  }

  return { err: false, msg: "" };
}
const config={
    RsaPublicKey:'-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoY8e9XE+wLDEA0ps24us2TZ3o/MTQ1WgcsADkNWYd8YucX6VW3ykol9gTMfV3WC3Ol6kH49Kq6naY7syxqBkHsjyQp8V25w5kiJrno3NlIfkwdd/xFJ2AxRQBz/BYHpIPtkBGvL/oV949Fed/k4in3iGgiWcshK4SWJ/Q8dm2C6H2PI8piF0kLLXPCM7h3wePuMUHb6A2hzuENhp+Kf5qmbrMz8q8PO3BvCsxKVX2273vFYX1+vFPS1r6rTMMayt6N3j+1tUSobAZ49Saew7rWjzYEy/s36hmCWqDAb++tLQtcgF1R+k0ZB+BdYMg5BLdXuF1Eyqcd5hiOH904uAZQIDAQAB-----END PUBLIC KEY-----'
};

export function RSA(pass) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(config.RsaPublicKey);
  return encrypt.encrypt(pass);
}
