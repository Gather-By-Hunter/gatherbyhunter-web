export interface ImageProps {
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  src: string;
}

export const Image: React.FC<ImageProps> = ({ className, src, style, alt }) => (
  <img src={src} className={className} style={style} alt={alt} />
);
