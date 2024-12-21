export function FormatAddressDesign(
  address: string | `0x${string}`,
  startChars = 6,
  endChars = 6
) {
  if (address.length <= startChars + endChars) {
    return address;
  }

  const visiblePart =
    address.substring(0, startChars) +
    '...' +
    address.substring(address.length - endChars);
  return visiblePart;
}
