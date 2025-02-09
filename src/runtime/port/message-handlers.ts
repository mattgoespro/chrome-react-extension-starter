import { RuntimePortMessageEvent } from "../../shared/message-event";

export async function onOptionsPageMessageReceived(
  message: RuntimePortMessageEvent<"settings-update-context-menu">
) {
  console.log(`Received options page message '${message.type}'`);
  console.log("Message: ", message);
}

export async function onActionPopupMessageReceived(message: RuntimePortMessageEvent) {
  console.log(`Received action popup message '${message.type}'`);
  console.log("Message: ", message);
}

export async function onContentScriptMessageReceived(message: RuntimePortMessageEvent) {
  console.log(`Received content script message '${message.type}'`);
  console.log("Message: ", message);
}
