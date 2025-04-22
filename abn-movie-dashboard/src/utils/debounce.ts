export default function debounce<T extends (...args: any[]) => any>(fn: T, delay: number)
  : (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId  = null;
      fn(...args);
    }, delay);
  };
}