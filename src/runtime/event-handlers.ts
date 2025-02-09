import { updateExtensionStorageData } from "../shared/storage/storage";
import {
  onContentScriptMessageReceived,
  onActionPopupMessageReceived,
  onOptionsPageMessageReceived
} from "./port/message-handlers";
import { onActionClicked } from "./action";

export async function onInstalled() {
  /**
   * The initial storage data can be set via the `EXTENSION_STORAGE_INITIAL_DATA` environment variable.
   */
  const initialData = process.env.EXTENSION_STORAGE_INITIAL_DATA;

  if (initialData != null) {
    await updateExtensionStorageData(JSON.parse(process.env.EXTENSION_STORAGE_INITIAL_DATA));
  }

  chrome.action.onClicked.addListener(onActionClicked);
}

export async function onReceivedConnection(port: chrome.runtime.Port) {
  console.log(`Extension received connection from port with name '${port.name}'.`);

  switch (port.name) {
    case "content-script":
      port.onMessage.addListener(onContentScriptMessageReceived);
      break;
    case "options-page": {
      port.onMessage.addListener(onOptionsPageMessageReceived);
      break;
    }
    case "action-popup":
      port.onMessage.addListener(onActionPopupMessageReceived);
      break;
    default:
      console.warn(
        `Extension received connection from an unhandled port with name '${port.name}'!`
      );
      break;
  }
}
