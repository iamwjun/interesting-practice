// ==UserScript==
// @name         ChatGPT for Edge
// @version      1.0
// @description  OpenAI ChatGPT integration for Edge
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const apiKey = 'YOUR_OPENAI_API_KEY';
  const model = 'gpt-3.5-turbo';

  function loadChatGPT() {
      const chatGPTScript = document.createElement('script');
      chatGPTScript.src = 'https://cdn.jsdelivr.net/npm/@openai/chatgpt/dist/chatgpt.min.js';
      chatGPTScript.onload = initializeChatGPT;
      document.head.appendChild(chatGPTScript);
  }

  function initializeChatGPT() {
      chatGPT.default.create(apiKey, model)
          .then((chatGPTInstance) => {
              window.chatGPTInstance = chatGPTInstance;
              console.log('ChatGPT initialized successfully!');
          })
          .catch((error) => {
              console.error('Failed to initialize ChatGPT:', error);
          });
  }

  loadChatGPT();
})();
