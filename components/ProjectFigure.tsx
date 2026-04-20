import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export default function ProjectFigure({ src, alt, caption, width = 1280, height = 720 }: Props) {
  return (
    <figure className="card mb-6 overflow-hidden">
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full object-contain bg-[color:var(--surface-soft)]"
        />
      </div>
      {caption && (
        <figcaption className="border-t border-[color:var(--line)] px-4 py-3 text-sm text-[color:var(--muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
