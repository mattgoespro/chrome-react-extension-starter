import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider, QueryOptions } from "react-query";
import { Popup } from "./popup/popup";
import { getExtensionStorageData } from "../../shared/storage/storage";
import { ExtensionSyncStorage } from "../../shared/storage/model";

async function getQueryClient() {
  const initialData = await getExtensionStorageData();
  console.log("Opening action popup with initial data: ", initialData);

  const queryOptions: QueryOptions<ExtensionSyncStorage> = {
    initialData
  };

  const client = new QueryClient({
    defaultOptions: {
      queries: queryOptions
    }
  });
  return client;
}

async function initializeActionPopup() {
  const root = document.getElementById("root");

  const client = await getQueryClient();

  const commPort = chrome.runtime.connect({ name: "action-popup" });

  createRoot(root).render(
    <QueryClientProvider client={client}>
      <Popup commPort={commPort} />
    </QueryClientProvider>
  );
}

initializeActionPopup();
