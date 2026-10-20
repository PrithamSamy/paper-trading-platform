export const inr = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value ?? 0));

export const formatDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value ?? "";

  return date.toLocaleString("en-IN");
};