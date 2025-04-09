
export default function PlatformIcon({ name }) {
  if (/playstation/i.test(name)) return <span>🎮</span>;
  if (/xbox/i.test(name)) return <span>🟩</span>;
  if (/pc/i.test(name)) return <span>🖥️</span>;
  if (/nintendo/i.test(name)) return <span>🎮</span>;
  if (/mac|linux/i.test(name)) return <span>💻</span>;
  if (/android|ios/i.test(name)) return <span>📱</span>;
  return <span>🎮</span>;
}
