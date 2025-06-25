const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");

function checkInputs() {
  const isUsernameFilled = usernameInput.value.trim() !== "";
  const isPasswordFilled = passwordInput.value.trim() !== "";

  if (isUsernameFilled && isPasswordFilled) {
    loginButton.disabled = false;
    loginButton.classList.add("enabled");
  } else {
    loginButton.disabled = true;
    loginButton.classList.remove("enabled");
  }
}

usernameInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);
