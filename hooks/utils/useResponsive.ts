import Utils from "../../components/lib/Utils"
import { Dimensions } from "react-native"

const useResponsive = () => {
  const breakpoints = {
    sm: 380,
    md: 420,
    lg: 680,
    tablet: 1024,
  }

  const { width } = Dimensions.get("window")

  let video = {
    dimension: {
      w: 0,
      h: 0,
    },
  }

  if (width >= breakpoints.tablet) {
    video.dimension.w = Utils.moderateScale(500)
    video.dimension.h = Utils.moderateScale(500)
  } else {
    video.dimension.w = Utils.moderateScale(380)
    video.dimension.h = Utils.moderateScale(230)
  }

  return {
    video,
  }
}

export default useResponsive
