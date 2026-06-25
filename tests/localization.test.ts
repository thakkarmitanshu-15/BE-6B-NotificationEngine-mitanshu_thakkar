import { getLocale } from "../src/localization/localizationLoader";

describe("Localization Loader", () => {

test("loads English locale", () => {
expect(
getLocale("en").greeting
).toBe("Hello");
});

test("loads Hindi locale", () => {
expect(
getLocale("hi").greeting
).toBe("नमस्ते");
});

test("falls back to English", () => {
expect(
getLocale("unknown").greeting
).toBe("Hello");
});

});
