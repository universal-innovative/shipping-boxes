const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});
export function formatINR(value) {
  return INR_FORMATTER.format(Number(value || 0));
}
