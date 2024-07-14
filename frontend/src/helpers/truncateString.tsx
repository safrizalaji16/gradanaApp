export function truncateString(inputString: string, maxLength: number): string {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    const truncatedString = inputString.substring(0, maxLength - 3) + "...";
    return truncatedString;
  }
}
