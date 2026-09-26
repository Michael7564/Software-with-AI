if (Parse.User.current()) {
  window.location.href = "dashboard.html";
}

const form = document.getElementById("signup-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorEl = document.getElementById("error");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.classList.add("hidden");
  submitBtn.disabled = true;
  submitBtn.textContent = "Creating account…";

  try {
    const user = new Parse.User();
    user.set("username", usernameInput.value);
    user.set("email", emailInput.value);
    user.set("password", passwordInput.value);
    await user.signUp();
    // signUp() logs the user in automatically.
    window.location.href = "dashboard.html";
  } catch (err) {
    errorEl.textContent = err.message || "Could not create account.";
    errorEl.classList.remove("hidden");
    submitBtn.disabled = false;
    submitBtn.textContent = "Create account";
  }
});
