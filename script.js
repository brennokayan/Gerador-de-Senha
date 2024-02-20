let passwordLength = 8;

const components = {
  InpPassword: document.getElementById("password"),
  InpRangePassword: document.getElementById("password-length"),
  BtnCopyPasswordActions: document
    .getElementById("button-copy-password-actions")
    .addEventListener("click", () => {
      CopyPassword();
    }),
  BtnRenewPasswordActions: document
    .getElementById("button-renew-password-actions")
    .addEventListener("click", () => {
      GenereatePassword();
    }),

  PasswordLengthText: document.getElementById("password-length-text"),
  CheckboxUpperCase: document.getElementById("checkbox-uppercase"),
  CheckboxNumbers: document.getElementById("checkbox-number"),
  CheckboxSymbols: document.getElementById("checkbox-symbol"),
  SecurityIndicatorBar: document.getElementById("security-indicator-bar"),
};
components.InpRangePassword.addEventListener("input", () => {
  passwordLength = components.InpRangePassword.value;
  GenereatePassword();
});

function GenereatePassword() {
  var chars = "abcdefghijklmnopqrstuvwxyz";
  const UppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbersChars = "0123456789";
  const specialChars = "!?@#$%&*()_+[]";
  if (components.CheckboxUpperCase.checked) {
    chars += UppercaseChars;
  }
  if (components.CheckboxNumbers.checked) {
    chars += numbersChars;
  }
  if (components.CheckboxSymbols.checked) {
    chars += specialChars;
  }
  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  components.InpPassword.value = password;
  components.PasswordLengthText.innerText = passwordLength;
  CalculateQuality();
  CalculateFont();
}
function CalculateQuality() {
  const password = components.InpPassword.value;
  let length =
    (password.length / 64) * 25 +
    (components.CheckboxUpperCase.checked ? 30 : 0) +
    (components.CheckboxNumbers.checked ? 15 : 0) +
    (components.CheckboxSymbols.checked ? 30 : 0);
  components.SecurityIndicatorBar.style.width = length + "%";

  if (length > 69) {
    components.SecurityIndicatorBar.classList.remove("critical");
    components.SecurityIndicatorBar.classList.remove("warning");
    components.SecurityIndicatorBar.classList.add("safe");
  } else if (length > 50) {
    components.SecurityIndicatorBar.classList.remove("critical");
    components.SecurityIndicatorBar.classList.add("warning");
    components.SecurityIndicatorBar.classList.remove("safe");
  } else {
    components.SecurityIndicatorBar.classList.add("critical");
    components.SecurityIndicatorBar.classList.remove("warning");
    components.SecurityIndicatorBar.classList.remove("safe");
  }
  if (length === 100) {
    components.SecurityIndicatorBar.classList.add("completed");
  } else {
    components.SecurityIndicatorBar.classList.remove("completed");
  }
}
function CalculateFont() {
  if (passwordLength > 48) {
    components.InpPassword.classList.add("font-xxs");
    components.InpPassword.classList.remove("font-xs");
    components.InpPassword.classList.remove("font-sm");
  } else if (passwordLength > 32) {
    components.InpPassword.classList.remove("font-xxs");
    components.InpPassword.classList.add("font-xs");
    components.InpPassword.classList.remove("font-sm");
  } else if (passwordLength > 16) {
    components.InpPassword.classList.remove("font-xxs");
    components.InpPassword.classList.remove("font-xs");
    components.InpPassword.classList.add("font-sm");
  } 
  else{
    components.InpPassword.classList.remove("font-xxs");
    components.InpPassword.classList.remove("font-xs");
    components.InpPassword.classList.remove("font-sm");
  }
}
components.CheckboxUpperCase.addEventListener("click", () => {
  GenereatePassword();
});
components.CheckboxNumbers.addEventListener("click", () => {
  GenereatePassword();
});
components.CheckboxSymbols.addEventListener("click", () => {
  GenereatePassword();
});
function CopyPassword() {
  navigator.clipboard.writeText(components.InpPassword.value);
}
GenereatePassword();
