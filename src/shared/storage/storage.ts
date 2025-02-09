import { ExtensionStorageKey, ExtensionSyncStorage } from "./model";

/**
 * Retrieves the extension's storage data.
 *
 * @returns the extension's storage data.
 */
export async function getExtensionStorageData(): Promise<ExtensionSyncStorage> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get<ExtensionSyncStorage>(ExtensionStorageKey, (items) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }

      resolve(items);
    });
  });
}

/**
 * Updates the extension's storage data.
 * @param value the data to overwrite the current storage with.
 * @returns the new storage data.
 */
export async function updateExtensionStorageData(
  value: Partial<ExtensionSyncStorage>
): Promise<ExtensionSyncStorage> {
  const currentStorage = await getExtensionStorageData();
  await chrome.storage.sync.set<ExtensionSyncStorage>({
    ...currentStorage,
    ...value
  });

  return getExtensionStorageData();
}

export type StorageChangeValue<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    oldValue: T[K];
    newValue: T[K];
  };
};
