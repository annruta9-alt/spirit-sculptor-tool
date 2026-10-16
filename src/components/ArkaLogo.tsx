import { logoSVG } from '@/lib/arka-logo';

export function ArkaLogo({ id, mark = false, className }: { id: string; mark?: boolean; className?: string }) {
  return <span className={`arka-logo ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: logoSVG(id, { hov: true, mark }) }} />;
}
