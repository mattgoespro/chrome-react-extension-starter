import styles from "./popup.module.scss";
import { useQuery } from "react-query";
import { ExtensionStorageKey, ExtensionSyncStorage } from "../../../shared/storage/model";
import { getExtensionStorageData } from "../../../shared/storage/storage";
import { useEffect } from "react";

type PopupProps = {
  commPort: chrome.runtime.Port;
};

export function Popup(props: PopupProps) {
  const { data, isLoading, error } = useQuery<ExtensionSyncStorage, Error, ExtensionSyncStorage>(
    ExtensionStorageKey,
    {
      queryFn: async () => {
        return getExtensionStorageData();
      }
    }
  );

  useEffect(() => {
    console.log(
      `Action popup mounted and established extension runtime communication on channel '${props.commPort.name}'.`
    );
    console.log(`Resolved extension storage data: `, data);
  }, [props.commPort.name]);

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["heading"]}>Appended Text Search</div>
      <div className={styles["content"]}>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <p>This is the extension popup.</p>
        <p>Here, you can view and update the extension settings or data.</p>
        <p>
          Communication with the extension can be made using the provided <code>commPort</code>.
          <button onClick={() => props.commPort.postMessage({ type: "popup-button-clicked" })} />
        </p>
      </div>
    </div>
  );
}
