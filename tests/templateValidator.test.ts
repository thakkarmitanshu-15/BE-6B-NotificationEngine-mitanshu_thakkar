import {
  validateTemplateData
} from "../src/template-engine/templateValidator";

describe(
  "Template Validation",
  () => {

    test(
      "all fields present",
      () => {

        const result =
          validateTemplateData(
            [
              "userName",
              "amount"
            ],
            {
              userName:
                "Mitanshu",
              amount:
                5000
            }
          );

        expect(result)
          .toHaveLength(0);

      }
    );

    test(
      "missing field",
      () => {

        const result =
          validateTemplateData(
            [
              "userName",
              "amount"
            ],
            {
              userName:
                "Mitanshu"
            }
          );

        expect(result)
          .toContain("amount");

      }
    );

  }
);