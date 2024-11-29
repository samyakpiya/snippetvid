import Image, { ImageProps } from "next/image";

type TImageProps = Partial<ImageProps>;

const BackgroundBlurImage = ({ height, width, ...props }: TImageProps) => {
  return (
    <Image
      src={"/Blurred Eclipse.png"}
      alt={"Background Blur"}
      height={height ?? 40}
      width={width ?? 40}
      {...props}
    />
  );
};

const CompanyLogo = ({ height, width, ...props }: TImageProps) => {
  return (
    <Image
      src={"/SnippetVid Logo.svg"}
      alt={"SnippetVid Logo"}
      height={height ?? 40}
      width={width ?? 40}
      {...props}
    />
  );
};

export { CompanyLogo, BackgroundBlurImage };
