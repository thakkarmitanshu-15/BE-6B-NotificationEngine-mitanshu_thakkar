export function validateTemplateData(
  requiredFields: string[],
  data: Record<string, any>
): string[] {

  const missingFields: string[] = [];

  for (const field of requiredFields) {
    if (
      data[field] === undefined ||
      data[field] === null
    ) {
      missingFields.push(field);
    }
  }

  return missingFields;
}