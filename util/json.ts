/*
import sjson from 'secure-json-parse';

export function parseJson(
  stringifiedJson: string,
): undefined | CookieCommentItem[] {
  if (!stringifiedJson) return undefined;

  try {
    return sjson(stringifiedJson);
  } catch {
    return undefined;
  }
}
*/

import sjson from 'secure-json-parse';

export function parseJson(string) {
  if (!string) return undefined;

  try {
    return sjson(string);
  } catch {
    return undefined;
  }
}
