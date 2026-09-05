export const LANGUAGE_SCROLL_KEY = 'darren:language-scroll';
const MAX_AGE_MS = 10_000;

type ScrollStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
type Destination = { pathname: string; locale: string };

export function rememberLanguageScroll(
  storage: ScrollStorage,
  destination: Destination & { scrollY: number },
  now = Date.now(),
): void {
  try {
    storage.setItem(LANGUAGE_SCROLL_KEY, JSON.stringify({ ...destination, savedAt: now }));
  } catch {
    // Language navigation must still work when browser storage is unavailable.
  }
}

export function clearLanguageScroll(storage: ScrollStorage): void {
  try {
    storage.removeItem(LANGUAGE_SCROLL_KEY);
  } catch {
    // Browser privacy settings may block storage access.
  }
}

export function consumeLanguageScroll(
  storage: ScrollStorage,
  destination: Destination & { hash: string },
  now = Date.now(),
): number | null {
  try {
    if (destination.hash) {
      clearLanguageScroll(storage);
      return null;
    }

    const raw = storage.getItem(LANGUAGE_SCROLL_KEY);
    if (!raw) return null;
    let saved;
    try {
      saved = JSON.parse(raw);
    } catch {
      clearLanguageScroll(storage);
      return null;
    }

    if (
      !saved
      || typeof saved.pathname !== 'string'
      || typeof saved.locale !== 'string'
      || !Number.isFinite(saved.scrollY)
      || saved.scrollY < 0
      || !Number.isFinite(saved.savedAt)
      || now < saved.savedAt
      || now - saved.savedAt >= MAX_AGE_MS
    ) {
      clearLanguageScroll(storage);
      return null;
    }

    if (saved.pathname !== destination.pathname || saved.locale !== destination.locale) return null;
    storage.removeItem(LANGUAGE_SCROLL_KEY);
    return saved.scrollY;
  } catch {
    return null;
  }
}
