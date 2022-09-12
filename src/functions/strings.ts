/**
 * Capitalize a string. This technically only capitalizes the first letter, if you want "title case"
 * (the first letter capitalized, and the rest lowercased), use {@link capStrict}.
 *
 * @see capStrict
 */
export function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.substring(1);
}

/**
 * Strictly capitalize a string, converting it naively into title case. This only looks at the first
 * letter, then toLower()'s the rest of it. If you're wanting to convert a sentence to title case,
 * use {@link title}.
 *
 * @see cap
 */
export function capStrict(s: string): string {
  return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
}

/**
 * Convert a string to title-case. This operates on each word in the string.
 *
 * @see cap
 * @see capStrict
 */
export function title(s: string): string {
  return s.split(' ').map(capStrict).join(' ');
}
