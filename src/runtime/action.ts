/**
 * Handle a click of the action icon in the extension toolbar.
 * @param tab The tab context in which the action was clicked.
 */
export async function onActionClicked(tab: chrome.tabs.Tab) {
  console.log("Action clicked in tab:", tab);
}
