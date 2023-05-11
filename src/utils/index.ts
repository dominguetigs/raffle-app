export class Utils {
  static raffle(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static initConffeti(element: any) {
    const config = {
      spread: 150,
      startVelocity: '100',
      elementCount: '250',
      width: '1.5rem',
      height: '1.5rem',
      perspective: '500px',
      colors: ['#061333', '#0c204c', '#b6bcc9'],
      duration: '6000',
    };
    window.Confetti(element, config);
  }
}
