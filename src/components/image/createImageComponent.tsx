import { Image, ImageProps } from "./Image.tsx";

export const createImageComponent: ({
  className,
  src,
}: ImageProps) => React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> =
  ({ className, src, style }) =>
  ({ className: newClassName, style: newStyle }) =>
    (
      <Image
        className={className ? `${className} ${newClassName}` : newClassName}
        src={src}
        style={
          style ? (newStyle ? { ...style, ...newStyle } : newStyle) : newStyle
        }
      />
    );
