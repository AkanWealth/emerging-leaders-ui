const formatText = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
export default formatText;

export const formatNumber = (num: number | string) => num.toLocaleString();
