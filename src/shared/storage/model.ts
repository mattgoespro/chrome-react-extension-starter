/**
 * The key used to store the extension storage.
 *
 * Configure the storage key used to identify the extension's allocated storage.
 */
export const ExtensionStorageKey = "extensionStorage";

/**
 * Represents the storage model for the extension.
 *
 * Configure any storage keys and their types here.
 */
export type ExtensionSyncStorage = Record<string, unknown>;
