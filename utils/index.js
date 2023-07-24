

const PRESSURE_UNITS = 0.750062;

export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const getPressure = (hpa) => {
  return Math.round(hpa * PRESSURE_UNITS)
}

export const getTime = (seconds) => {
    return new Date(seconds * 1000).toLocaleTimeString('ua-UA', {timeZone: 'Atlantic/Reykjavik'})
}
