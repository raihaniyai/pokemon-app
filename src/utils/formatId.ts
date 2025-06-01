export default function formatIdToThreeDigits(id: number): string {
  return id.toString().padStart(3, '0');
}