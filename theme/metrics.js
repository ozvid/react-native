import { Dimensions, PixelRatio } from "react-native";

const device_reolution = Dimensions.get("window");

export const widthPercentageToDP = widthPercent => {
  const screenWidth = device_reolution.width;

  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const heightPercentageToDP = heightPercent => {
  const screenHeight = device_reolution.height;

  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export default {
  deviceWidth: device_reolution.width,
  deviceHeight: device_reolution.height,
  gutters: {
    small: 2,
    medium: 5,
    big: 10
  }
};
