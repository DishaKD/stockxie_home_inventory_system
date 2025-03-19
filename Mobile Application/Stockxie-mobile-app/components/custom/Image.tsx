import React from "react";
import { Image } from "expo-image";

type Props = {
  source: { uri: string };
  style?: object;
  resizeMode?: "cover" | "contain" | "fill"; // "stretch" is not valid for expo-image
};

const CustomImage: React.FC<Props> = ({
  source,
  style,
  resizeMode,
}): JSX.Element => {
  return (
    <Image
      source={source}
      style={style}
      contentFit={resizeMode || "cover"} // Default to "cover"
    />
  );
};

export default CustomImage;
