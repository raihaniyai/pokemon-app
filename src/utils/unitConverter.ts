export function convertHectogramsToKilograms(hg: number) {
  return (hg * 0.1).toFixed(1);
}

export function convertHectogramsToPounds(hg: number) {
  return (hg * 0.220462).toFixed(2);
}

export function convertDecimetersToCentimeters(dm: number) {
  return (dm * 10).toFixed(2);
}

export function convertDecimetersToMeters(dm: number) {
  return (dm * 0.1).toFixed(2);
}

export function convertDecimetersToFootFormat(dm: number) {
  const totalInches = dm * 3.93701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.floor(totalInches % 12);
  const fraction = ((totalInches % 1) * 10).toFixed(0); // one decimal place as digit

  return `${feet}'${inches}"${fraction}`;
}

