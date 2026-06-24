import Handlebars from "handlebars";

export function renderTemplate(
  template: string,
  data: Record<string, unknown>
) {
  const compiled =
    Handlebars.compile(template);

  return compiled(data);
}