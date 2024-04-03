import { errorLog } from "./log";

const LOG_PREFIX = "[chrome-extension-starter]";

describe("log", () => {
  describe("errors", () => {
    it("should log a formatted error given a primitive argument", () => {
      const error = new Error("Generic error");
      expect(errorLog("A generic error occurred.", error)).toBe(
        `${LOG_PREFIX} error: A generic error occurred.\n${LOG_PREFIX}: ${error.name}(\nstack: ${error.stack}\nmessage: ${error.message}\n)`
      );
    });

    it("should log a formatted error given an array of primitive arguments", () => {
      const error = new Error("Generic error");
      expect(errorLog(["A generic error occurred."], error)).toBe(
        `${LOG_PREFIX} error: A generic error occurred.\n${LOG_PREFIX}: ${error.name}(\nstack: ${error.stack}\nmessage: ${error.message}\n)`
      );
    });

    it("should log a formatted error given a mix of primitive and object arguments", () => {
      const error = new Error("Generic error");
      expect(
        errorLog(
          ["A generic error occurred.", { reason: "Application failed to start." }, "Exiting."],
          error
        )
      ).toBe(
        `${LOG_PREFIX} error: A generic error occurred.\n${LOG_PREFIX} ...Application failed to start.\n${LOG_PREFIX} error: Object(\n\tmessage: A generic error occurred.\n)\n${LOG_PREFIX}: ${error.name}(\nstack: ${error.stack}\nmessage: ${error.message}\n)`
      );
    });

    it("should log a formatted error given an object argument", () => {
      const error = new Error("Generic error");
      expect(errorLog({ message: "A generic error occurred." }, error)).toBe(
        `${LOG_PREFIX} error: Object(\n\tmessage: A generic error occurred.\n)`
      );
    });
  });

  describe("warnings", () => {
    it("should log a string", () => {
      const error = new Error("Generic error");
      expect(errorLog("A generic warning occurred.", error)).toBe(
        `${LOG_PREFIX} error: A generic warning occurred.\n${LOG_PREFIX}: ${error.name}(\nstack: ${error.stack}\nmessage: ${error.message}\n)`
      );
    });

    it("should log an object", () => {
      const error = new Error("Generic error");
      expect(errorLog({ message: "A generic warning occurred." }, error)).toBe(
        `${LOG_PREFIX} error: Object(\n\tmessage: A generic warning occurred.\n)`
      );
    });

    it("should log a number", () => {
      const error = new Error("Generic error");
      expect(errorLog(42, error)).toBe(
        `${LOG_PREFIX} error: 42\n${LOG_PREFIX}: ${error.name}(\nstack: ${error.stack}\nmessage: ${error.message}\n)`
      );
    });

    it("should log a boolean", () => {
      const error = new Error("Generic error");
      expect(errorLog(true, error)).toBe(
        `${LOG_PREFIX} error: true\n${LOG_PREFIX}: ${error.name}(\nstack: ${error.stack}\nmessage: ${error.message}\n)`
      );
    });

    it("should log an array", () => {
      const error = new Error("Generic error");
      expect(errorLog(["A generic warning occurred."], error)).toBe(
        `${LOG_PREFIX} error: A generic warning occurred.\n${LOG_PREFIX}: ${error.name}(\nstack: ${error.stack}\nmessage: ${error.message}\n)`
      );
    });

    it("should log an unknown type", () => {
      const error = new Error("Generic error");
      expect(errorLog(undefined, error)).toBe(
        `${LOG_PREFIX} error: <unknown-type>\n${LOG_PREFIX}: ${error.name}(\nstack: ${error.stack}\nmessage: ${error.message}\n)`
      );
    });

    it("should log an error without a message", () => {
      const error = new Error();
      expect(errorLog("A generic warning occurred.", error)).toBe(
        `${LOG_PREFIX} error: A generic warning occurred.\n${LOG_PREFIX}: Error(\nstack: ${error.stack}\nmessage: \n)`
      );
    });

    it("should log an error without a stack", () => {
      const error = new Error("Generic error");
      error.stack = undefined;
      expect(errorLog("A generic warning occurred.", error)).toBe(
        `${LOG_PREFIX} error: A generic warning occurred.\n${LOG_PREFIX}: Error(\nstack: \nmessage: ${error.message}\n)`
      );
    });

    it("should log an error without a name", () => {
      const error = new Error("Generic error");
      error.name = undefined;
      expect(errorLog("A generic warning occurred.", error)).toBe(
        `${LOG_PREFIX} error: A generic warning occurred.\n${LOG_PREFIX}: Error(\nstack: ${error.stack}\nmessage: ${error.message}\n)`
      );
    });

    it("should log an error without a message, stack, or name", () => {
      const error = new Error();
      error.stack = undefined;
      error.name = undefined;
      expect(errorLog("A generic warning occurred.", error)).toBe(
        `${LOG_PREFIX} error: A generic warning occurred.\n${LOG_PREFIX}: Error(\nstack: \nmessage: \n)`
      );
    });
  });
});
