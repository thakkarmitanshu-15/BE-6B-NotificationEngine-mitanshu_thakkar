import Handlebars from "handlebars";

Handlebars.registerHelper(
  "truncate",
  function (
    text,
    length
  ) {
    return text.length > length
      ? text.substring(0, length) + "..."
      : text;
  }
);