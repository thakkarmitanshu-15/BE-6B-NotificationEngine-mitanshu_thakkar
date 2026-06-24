import en from "./en.json";
import hi from "./hi.json";
import mr from "./mr.json";
import ta from "./ta.json";
import te from "./te.json";

const locales = {
  en,
  hi,
  mr,
  ta,
  te,
};

export function getLocale(language: string) {
  return locales[
    language.toLowerCase() as keyof typeof locales
  ] || en;
}