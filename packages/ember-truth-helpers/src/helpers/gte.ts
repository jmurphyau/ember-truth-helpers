export default function gte(
  left: unknown,
  right: unknown,
  options?: { forceNumber?: boolean }
) {
  if (options?.forceNumber) {
    if (typeof left !== 'number') {
      left = Number(left);
    }
    if (typeof right !== 'number') {
      right = Number(right);
    }
  }
  return (left as number) >= (right as number);
}
