type RuntimePortMessagePayloads = {
  "contentscript-loaded": { pageUrl: string };
  "settings-update-context-menu": undefined;
  "popup-update-append-text-option": { appendText: string };
};

type RuntimePortMessageSource = {
  [K in keyof RuntimePortMessagePayloads]: K extends `${infer Source}-${infer _}` ? Source : never;
}[keyof RuntimePortMessagePayloads];

export type RuntimePortMessageType = keyof RuntimePortMessagePayloads;

export type RuntimePortMessageEvent<T extends RuntimePortMessageType = RuntimePortMessageType> =
  RuntimePortMessagePayloads[T] extends undefined
    ? {
        source: RuntimePortMessageSource;
        type: T;
      }
    : { source: RuntimePortMessageSource; type: T; message: RuntimePortMessagePayloads[T] };
