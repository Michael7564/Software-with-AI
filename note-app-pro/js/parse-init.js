// Copy js/config.example.js to js/config.js (gitignored) and fill in your
// Back4app keys. This file just initializes the SDK using whatever
// js/config.js set on window.MARGINALIA_CONFIG.

if (typeof MARGINALIA_CONFIG === "undefined") {
  console.error("Missing js/config.js — copy js/config.example.js and add your Back4app keys.");
} else {
  Parse.initialize(MARGINALIA_CONFIG.appId, MARGINALIA_CONFIG.jsKey);
  Parse.serverURL = MARGINALIA_CONFIG.serverUrl;
}
