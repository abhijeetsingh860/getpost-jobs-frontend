export const formatSalary = (salary) => {
  if (!salary) return "0";
  const lpa = salary / 100000;
  return lpa % 1 === 0 ? lpa.toString() : lpa.toFixed(1);
};