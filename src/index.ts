import {
  BLANK_URL,
  ctrlCharactersRegex,
  htmlCtrlEntityRegex,
  htmlEntitiesRegex,
  invalidProtocolRegex,
  relativeFirstCharacters,
  urlSchemeRegex,
} from "./constants";

function isRelativeUrlWithoutProtocol(url: string): boolean {
  return relativeFirstCharacters.indexOf(url[0]) > -1;
}

// adapted from https://stackoverflow.com/a/29824550/2601552
function decodeHtmlCharacters(str: string) {
  const removedNullByte = str.replace(ctrlCharactersRegex, "");
  return removedNullByte.replace(htmlEntitiesRegex, (match, dec) => {
    return String.fromCharCode(dec);
  });
}

export function sanitizeUrl(url?: string): string {
  if (!url) {
    return BLANK_URL;
  }

  const sanitizedUrl = decodeHtmlCharacters(url)
    .replace(htmlCtrlEntityRegex, "")
    .replace(ctrlCharactersRegex, "")
    .trim();

  if (!sanitizedUrl) {
    return BLANK_URL;
  }

  if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
    return sanitizedUrl;
  }

  const urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);

  if (!urlSchemeParseResults) {
    return sanitizedUrl;
  }

  const urlScheme = urlSchemeParseResults[0];

  if (invalidProtocolRegex.test(urlScheme)) {
    return BLANK_URL;
  }

  return sanitizedUrl;
}
