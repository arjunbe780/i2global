export const getDay = (timestamp: any) => {
  const date = new Date(timestamp * 1000);
  const dayName = date.toLocaleDateString('en-US', {weekday: 'long'});
  return dayName;
};

export const sortByTime = (data: any) => {
  return data.sort((a: any, b: any) => {
    const [h1, m1] = a.time.split(':').map(Number);
    const [h2, m2] = b.time.split(':').map(Number);
    return h1 * 60 + m1 - (h2 * 60 + m2);
  });
};
