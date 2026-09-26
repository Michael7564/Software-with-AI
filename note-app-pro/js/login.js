// Already logged in? Skip straight to the dashboard.
if (Parse.User.current()) {
  window.location.href = "dashboard.html";
}

const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorEl = document.getElementById("error");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.classList.add("hidden");
  submitBtn.disabled = true;
  submitBtn.textContent = "Logging in…";

  try {
    await Parse.User.logIn(usernameInput.value, passwordInput.value);
    window.location.href = "dashboard.html";
  } catch (err) {
    errorEl.textContent = err.message || "Could not log in.";
    errorEl.classList.remove("hidden");
    submitBtn.disabled = false;
    submitBtn.textContent = "Log in";
  }
});
