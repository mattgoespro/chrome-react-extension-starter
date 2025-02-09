export const ContextMenuOptionId = "chromeReactExtensionStarter";

/**
 * Synchronously update an extension context menu item.
 * @param id The ID of the context menu item to update.
 * @param item The properties to update on the context menu item.
 * @returns A promise that resolves when the context menu item has finished updating.
 */
export async function updateContextMenu(
  id: string,
  item: chrome.contextMenus.UpdateProperties
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.contextMenus.update(id, item, async () => {
      if (chrome.runtime.lastError != null) {
        console.warn(
          `Failed to update context menu item '${id}'. Chrome runtime encountered an error:`,
          chrome.runtime.lastError
        );
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }

      resolve();
    });
  });
}

/**
 * Handle an extension context menu option being clicked.
 * @param menuItemId
 * @param selectionText
 */
export async function onContextMenuOptionClicked({
  menuItemId,
  selectionText
}: chrome.contextMenus.OnClickData) {
  console.log(`Context menu option clicked '${menuItemId}' with text selection '${selectionText}`);
}
