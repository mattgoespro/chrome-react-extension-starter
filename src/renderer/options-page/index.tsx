import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider, QueryOptions } from "react-query";
import { getExtensionStorageData } from "../../shared/storage/storage";
import { ExtensionSyncStorage } from "../../shared/storage/model";
import { Options } from "./options/options";

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

async function initializeOptionsPage() {
  const root = document.getElementById("root");

  const client = await getQueryClient();

  const commPort = chrome.runtime.connect({ name: "options-page" });

  createRoot(root).render(
    <QueryClientProvider client={client}>
      <Options commPort={commPort} />
    </QueryClientProvider>
  );
}

initializeOptionsPage();
