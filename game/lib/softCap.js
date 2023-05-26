import Decimal from "../../break_eternity.esm.js";

export const softCap = (num, cap) => {
  if (num.lessThanOrEqualTo(cap)) return num;
  let capped = num.div(cap);
  capped = new Decimal(capped.log2()).add(1);
  return cap.mul(capped).min(num);
};

export const strongsoftcap = (num, cap) => {
  if (num.lessThanOrEqualTo(cap)) return num;
  let capped = num.div(cap);
  capped = new Decimal(capped.log2()).add(1);
  capped = new Decimal(capped.log2()).add(1);
  return cap.mul(capped).min(num);
};
