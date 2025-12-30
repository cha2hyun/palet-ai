export interface AIServiceConfig {
  name: string;
  displayName: string;
  url: string;
  partition: string;
  selector: string;
  buttonSelector: string;
  color: string;
}

export const AI_SERVICES: Record<string, AIServiceConfig> = {
  chatgpt: {
    name: 'chatgpt',
    displayName: 'ChatGPT',
    url: 'https://chat.openai.com',
    partition: 'persist:chatgpt',
    selector: 'div#prompt-textarea[contenteditable="true"]',
    buttonSelector: 'button[data-testid="send-button"]',
    color: 'green'
  },
  gemini: {
    name: 'gemini',
    displayName: 'Gemini',
    url: 'https://gemini.google.com/app',
    partition: 'persist:gemini',
    selector: 'div.ql-editor[contenteditable="true"]',
    buttonSelector: 'button.send-button[aria-label="Send message"]',
    color: 'blue'
  },
  perplexity: {
    name: 'perplexity',
    displayName: 'Perplexity',
    url: 'https://www.perplexity.ai/',
    partition: 'persist:perplexity',
    selector: '#ask-input, div[contenteditable="true"][role="textbox"]',
    buttonSelector: 'button[data-testid="submit-button"], button[aria-label="Submit"]',
    color: 'purple'
  },
  claude: {
    name: 'claude',
    displayName: 'Claude',
    url: 'https://claude.ai/new',
    partition: 'persist:claude',
    selector: 'div[contenteditable="true"][role="textbox"][data-testid="chat-input"]',
    buttonSelector: 'button[aria-label="메시지 보내기"], button[aria-label*="Send"]',
    color: 'orange'
  },
  mistral: {
    name: 'mistral',
    displayName: 'Mistral',
    url: 'https://chat.mistral.ai/',
    partition: 'persist:mistral',
    selector: 'div.ProseMirror[contenteditable="true"]',
    buttonSelector: 'button[type="submit"][aria-label="Send question"], button[type="submit"]',
    color: 'red'
  }
};

export const DEFAULT_BROWSER_URL = 'https://www.google.com';
