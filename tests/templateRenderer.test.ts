import { renderTemplate }
from "../src/template-engine/templateRenderer";

describe("Template Renderer", () => {

  test("renders transaction template", () => {

    const template =
      "Hello {{userName}}";

    const output =
      renderTemplate(
        template,
        {
          userName: "Mitanshu"
        }
      );

    expect(output)
      .toContain("Mitanshu");

  });
  test("renders user name", () => {
const output = renderTemplate(
"Hello {{userName}}",
{ userName: "Mitanshu" }
);

expect(output).toContain("Mitanshu");
});

test("renders amount", () => {
const output = renderTemplate(
"Amount {{amount}}",
{ amount: 5000 }
);

expect(output).toContain("5000");
});

test("handles special characters", () => {
const output = renderTemplate(
"Hello {{userName}}",
{ userName: "@mitanshu" }
);

expect(output).toContain("@");
});

test("handles Hindi text", () => {
const output = renderTemplate(
"{{greeting}}",
{ greeting: "नमस्ते" }
);

expect(output).toContain("नमस्ते");
});

test("handles Marathi text", () => {
const output = renderTemplate(
"{{greeting}}",
{ greeting: "नमस्कार" }
);

expect(output).toContain("नमस्कार");
});

test("handles Tamil text", () => {
const output = renderTemplate(
"{{greeting}}",
{ greeting: "வணக்கம்" }
);

expect(output).toContain("வணக்கம்");
});

test("handles Telugu text", () => {
const output = renderTemplate(
"{{greeting}}",
{ greeting: "నమస్కారం" }
);

expect(output).toContain("నమస్కారం");
});


});