// ** DOM SELECTOR UTILITY
const qs = (selector, parent = document) => {
  return parent.querySelector(selector);
};

// ** SELECTING THE DOM
const copy = qs('[data-copy]');
const inputPassword = qs('input[name="password"]');
const generatePassword = qs('[data-generate]');
const message = qs('.copied-message');

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
const characterCodes = Array.from(Array(26)).map((_, i) => i + 97);
const lowercase = characterCodes.map(code => String.fromCharCode(code));
const uppercase = lowercase.map(letters => letters.toLocaleUpperCase());

const generate = () => {
  const passwordLength = parseInt(qs('select[name="length"]').value);
  const hasSymbols = qs('input[name="symbols"]').checked;
  const hasNumbers = qs('input[name="numbers"]').checked;
  const isLowerCase = qs('input[name="lowercase"]').checked;
  const isUpperCase = qs('input[name="uppercase"]').checked;

  let availableCharacters = [
    ...(hasSymbols ? specialCharacters : []),
    ...(hasNumbers ? numbers : []),
    ...(isLowerCase ? lowercase : []),
    ...(isUpperCase ? uppercase : []),
  ];

  if (!availableCharacters.length) return setMessages('errorGenerate');

  let password = '';

  Array.from(Array(passwordLength)).forEach(index => {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    password += availableCharacters[randomIndex];
  });

  inputPassword.value = password;
  return setMessages('generate');
};

const copyPassword = () => {
  if (!Boolean(inputPassword.value)) return setMessages('errorCopy');

  inputPassword.select();
  inputPassword.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(inputPassword.value);

  inputPassword.value = '';
  return setMessages('copy');
};

const setMessages = text => {
  let mess;
  if (text === 'errorGenerate') {
    mess = 'Please select some options! ❌';
  }
  if (text === 'errorCopy') {
    mess = 'Empty Password Value! ❌';
  }
  if (text === 'generate') {
    mess = 'Password Generated! 👍';
  }
  if (text === 'copy') {
    mess = 'Password Copied! 👍';
  }

  message.textContent = mess;

  setTimeout(() => {
    message.textContent = '';
  }, 1500);
};

generatePassword.addEventListener('click', generate);
copy.addEventListener('click', copyPassword);
