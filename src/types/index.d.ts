export {};

declare global {
  interface Window {
    Confetti: (root: any, config: any) => void;
  }
}
