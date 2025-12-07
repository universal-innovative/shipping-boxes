const VALID_VIEWS = new Set(["form", "list"]);
function normalizeHash(hash) {
  const raw = (hash || "").replace(/^#\/?/, "");
  const view = raw || "form";
  return VALID_VIEWS.has(view) ? view : "form";
}

export function getCurrentView() {
  return normalizeHash(window.location.hash);
}

export function navigate(view) {
  const target = VALID_VIEWS.has(view) ? `#${view}` : "#form";
  if (window.location.hash !== target) {
    window.location.hash = target;
  } else {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

export function subscribe(onChange) {
  const handler = () => onChange(getCurrentView());
  window.addEventListener("hashchange", handler);
  handler();
  return () => window.removeEventListener("hashchange", handler);
}
export function ensureInitialHash() {
  if (!window.location.hash) window.location.hash = "#/form";
}
