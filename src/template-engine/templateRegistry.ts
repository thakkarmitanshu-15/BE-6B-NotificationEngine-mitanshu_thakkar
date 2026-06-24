const templates: Record<string, string> = {
  "TXNX-001-email": `
Hello {{userName}},

Your transaction of {{currency amount}}
was successful.

Stock: {{stock}}
`,

  "RISK-001-email": `
Hello {{userName}},

Unusual activity detected on your account.
Please review immediately.
`
};

export function getTemplate(
  eventType: string,
  channel: string
) {
  return templates[
    `${eventType}-${channel}`
  ];
}