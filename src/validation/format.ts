export interface MessageFormatter {
  format(message: string, placeholders: Record<string, unknown>): string;
}

export default class DefaultMessageFormatter implements MessageFormatter {
  format(message: string, placeholders: Record<string, unknown>): string {
    let formatted: string = message;
    for (const key in placeholders) {
      const pattern = `{{${key}}}`;
      const replacement = String(placeholders[key]);
      formatted = formatted.split(pattern).join(replacement);
    }
    return formatted;
  }
}
