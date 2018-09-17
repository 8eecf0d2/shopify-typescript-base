export const formatDate = (input: Date|number|string) => {
  const date = new Date(input);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let dateStr = `${days[date.getDay()]}, ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}${date.getHours() < 12 ? "am" : "pm"}`;

  return dateStr;
}

export const cookie = (name: string) => {
  const cookies = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return cookies ? cookies.pop() : "";
}

export class Deferred<T> {
 public promise: Promise<T>;
 public resolve: (value?: T | PromiseLike<T>) => void;
 public reject: (reason?: any) => void;
 constructor(
   public readonly id: string = Math.random().toString(),
) {
   this.promise = new Promise<T>((resolve, reject) => {
     this.resolve = resolve;
     this.reject = reject;
   });
 }
}
