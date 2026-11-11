/**
 * Shared reference-counted scroll-lock utility.
 * Prevents multiple overlay components (e.g. Mobile Menu, Modals, Drawers)
 * from colliding or releasing body scroll prematurely.
 */
let lockCount = 0;
let originalOverflow = "";
let originalPaddingRight = "";

export const acquireScrollLock = () => {
  if (typeof document === "undefined") return;

  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar shift on browsers where scrollbar-gutter isn't supported
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
  }
  lockCount += 1;
};

export const releaseScrollLock = () => {
  if (typeof document === "undefined") return;

  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow || "";
    document.body.style.paddingRight = originalPaddingRight || "";
  }
};
