import browser from "webextension-polyfill";
// import '../content-script/index.css';

browser.runtime.onMessage.addListener((msg) => {
  console.log("message received from content script: ", msg);
});
