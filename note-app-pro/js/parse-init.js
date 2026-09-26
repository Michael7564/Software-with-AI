// Already logged in? Skip straight to the dashboard when relevant pages check this.
if (typeof MARGINALIA_CONFIG === "undefined") {
  console.error("Missing js/config.js — copy js/config.example.js and add your Back4app keys.");
} else {
  Parse.initialize(MARGINALIA_CONFIG.appId, MARGINALIA_CONFIG.jsKey);
  Parse.serverURL = MARGINALIA_CONFIG.serverUrl;
}
