export interface ImageProps {
  className?: string;
  style?: React.CSSProperties;
  src: string;
}

export const Image: React.FC<ImageProps> = ({ className, src, style }) => (
  <img src={src} className={className} style={style} />
);
