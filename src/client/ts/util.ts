export const formatDate = (input: Date|number|string) => {
  const date = new Date(input);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let dateStr = `${days[date.getDay()]}, ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}${date.getHours() < 12 ? "am" : "pm"}`;

  return dateStr;
}
