const STORAGE_KEY = "shipping_boxes";

export async function listBoxes() {
  await new Promise((r) => setTimeout(r, 120));
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveBox(box) {
  await new Promise((r) => setTimeout(r, 120));
  const raw = localStorage.getItem(STORAGE_KEY);
  const list = raw ? JSON.parse(raw) : [];
  list.unshift(box);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return box;
}
