export default {
  username: '^[a-zA-Z0-9_-]{3,15}$',
  email: '[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+',
  passwordUpperCaseAndSpecialChar:
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$',
  passwordUpperCase: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
  passwordSpecialChar: '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$',
  password: '^(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
};
