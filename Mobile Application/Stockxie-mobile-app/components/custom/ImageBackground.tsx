import React from "react";
import { ImageBackground as ExpoImageBackground } from "expo-image";

type Props = {
  source?: { uri: string };
  style?: object;
  imageStyle?: object;
  resizeMode?: "cover" | "contain" | "fill"; // 'stretch' is not supported
  children?: React.ReactNode;
};

const ImageBackground: React.FC<Props> = ({
  children,
  source,
  resizeMode = "cover", // default to 'cover'
  style,
  imageStyle,
}): JSX.Element => {
  return (
    <ExpoImageBackground
      source={source}
      style={style}
      contentFit={resizeMode} // 'stretch' is removed here
    >
      {children}
    </ExpoImageBackground>
  );
};

export default ImageBackground;
