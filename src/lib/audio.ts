// Simple synth for retro sound effects using Web Audio API
// No external assets required!

class AudioController {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private enabled: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Initialize on first user interaction to handle autoplay policies
      window.addEventListener('click', () => this.init(), { once: true });
      window.addEventListener('keydown', () => this.init(), { once: true });
    }
  }

  private init() {
    if (this.ctx) return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.3; // Default volume (not too loud)
      this.masterGain.connect(this.ctx.destination);
      this.enabled = true;
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, startTime: number = 0) {
    if (!this.ctx || !this.masterGain) return;
    
    // Resume context if suspended (browser policy)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

    // Envelope
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.ctx.currentTime + startTime);
    osc.stop(this.ctx.currentTime + startTime + duration);
  }

  // SFX: Short high blip for hover
  playHover() {
    this.playTone(800, 'square', 0.05);
  }

  // SFX: Selection confirmation
  playClick() {
    this.playTone(440, 'square', 0.1);
    this.playTone(880, 'square', 0.1, 0.1);
  }

  // SFX: Success/Purchase (Ascending Arpeggio)
  playSuccess() {
    if (!this.ctx) return;
    const now = 0;
    const speed = 0.08;
    
    this.playTone(523.25, 'square', 0.1, now); // C5
    this.playTone(659.25, 'square', 0.1, now + speed); // E5
    this.playTone(783.99, 'square', 0.1, now + speed * 2); // G5
    this.playTone(1046.50, 'square', 0.4, now + speed * 3); // C6
  }

  // SFX: Error/Invalid
  playError() {
    this.playTone(150, 'sawtooth', 0.3);
  }

  // SFX: Typing/Data
  playType() {
    // Randomize pitch slightly
    const pitch = 800 + Math.random() * 200;
    this.playTone(pitch, 'square', 0.03);
  }

  // SFX: Intro / Start
  playIntro() {
    if (!this.ctx) return;
    const now = 0;
    // Dramatic opening chord (Low heavy drone)
    this.playTone(55, 'sawtooth', 3.0, now);      // A1
    this.playTone(110, 'sawtooth', 3.0, now);     // A2
    this.playTone(164.81, 'sawtooth', 3.0, now);  // E3
  }
}

// Export singleton
export const sfx = new AudioController();

