import { useCallback, useEffect, useRef, useState } from 'react';
import { soundtrack } from '../data/portfolio';

const KEY = 'shijinraj-music-off';

function readOff(): boolean {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

function writeOff(v: boolean) {
  try {
    localStorage.setItem(KEY, v ? '1' : '0');
  } catch {
    /* storage can be unavailable — ignore */
  }
}

/** Background soundtrack. Browsers block autoplay, so music starts on the first tap/click/key press. */
export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const userOff = useRef(readOff());
  const track = soundtrack[index];

  const play = useCallback(() => {
    const el = audio.current;
    if (!el) return;
    el.volume = 0.4;
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  // start on first interaction (unless the visitor turned music off before)
  useEffect(() => {
    if (userOff.current) return;
    const start = (e: Event) => {
      // a tap on the player itself is handled by its own buttons
      if (e.target instanceof Element && e.target.closest('[data-music]')) return;
      play();
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
    window.addEventListener('pointerdown', start);
    window.addEventListener('keydown', start);
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, [play]);

  // when the track changes while playing, keep playing
  useEffect(() => {
    if (playing) audio.current?.play().catch(() => setPlaying(false));
  }, [index, playing]);

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (el.paused) {
      userOff.current = false;
      writeOff(false);
      play();
    } else {
      el.pause();
      setPlaying(false);
      userOff.current = true;
      writeOff(true);
    }
  };

  const next = () => setIndex((i) => (i + 1) % soundtrack.length);
  const prev = () => setIndex((i) => (i - 1 + soundtrack.length) % soundtrack.length);

  return (
    <div className="fixed bottom-4 right-4 z-[160] flex items-center gap-2" data-music data-cursor="link">
      <audio ref={audio} src={track.src} preload="none" onEnded={next} />
      {open && (
        <div className="glass flex items-center gap-1 rounded-full py-1 pl-4 pr-1 text-xs text-bone">
          <span className="mr-2 max-w-[9rem] truncate" title="Original tracks by binaryking">
            {track.label}
          </span>
          <button type="button" onClick={prev} aria-label="Previous track" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10">
            ⏮
          </button>
          <button type="button" onClick={next} aria-label="Next track" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10">
            ⏭
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={toggle}
        onContextMenu={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        onDoubleClick={() => setOpen((o) => !o)}
        aria-label={playing ? 'Pause music' : 'Play music'}
        aria-pressed={playing}
        className="glass flex h-12 w-12 items-center justify-center rounded-full text-lg text-bone shadow-[0_0_30px_rgba(79,107,255,0.35)] transition hover:scale-105"
      >
        {playing ? '❚❚' : '♪'}
      </button>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Show track controls"
        aria-expanded={open}
        className="glass flex h-12 w-8 items-center justify-center rounded-full text-xs text-mist hover:text-bone"
      >
        {open ? '›' : '‹'}
      </button>
    </div>
  );
}
