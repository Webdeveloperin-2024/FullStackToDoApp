export const isToday = (date) => {
  const today = new Date();
  const d = new Date(date);

  if (isNaN(d.getTime())) return false;
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
};



export const isUpcoming = (date) => {
  const today = new Date();
    today.setHours(0, 0, 0, 0);
  const d = new Date(date);
    d.setHours(0, 0, 0, 0);
  if (isNaN(d.getTime())) return false;
  return d >=today;
};


export const isUpcoming7Days = (date) => {
  const today = new Date();
  const d = new Date(date);

  if (isNaN(d.getTime())) return false;

  const next7Days = new Date();
  next7Days.setDate(today.getDate() + 7);

  return d >= today && d <= next7Days;
};