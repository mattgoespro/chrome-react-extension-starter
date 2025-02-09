import { RuntimePortMessageEvent } from "../shared/message-event";

let port = chrome.runtime.connect({ name: "content-script" });

function log(...args: unknown[]) {
  console.log(
    `[chrome-react-extension-starter] `,
    [`Injected page: ${location.href}`, ...args].join("\n")
  );
}

document.addEventListener("DOMContentLoaded", () => {
  log("Content script loaded, notifying extension...");

  const contentScriptLoadedEvent: RuntimePortMessageEvent = {
    type: "contentscript-loaded",
    source: "contentscript",
    message: {
      pageUrl: location.href
    }
  };
  port.postMessage(contentScriptLoadedEvent);
});

port.onDisconnect.addListener(() => {
  log("Content script disconnected, reconnecting...");
  port = chrome.runtime.connect({ name: "contentscript" });
});

window.onclose = () => {
  port.disconnect();
  log("Content script disconnected because the window was closed.");
};
