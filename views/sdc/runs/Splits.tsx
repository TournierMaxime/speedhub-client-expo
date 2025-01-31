import React, { Fragment } from "react"
import { View, Text } from "react-native"
import Utils from "@/components/lib/Utils"
import { splitIOService } from "@/services/speedrunDotCom"
import { useQuery } from "@tanstack/react-query"
import { Splits } from "@/types/sdc"
import Runtime from "@/components/lib/RunTime"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import splitsStyle from "@/styles/views/splits"
import mainStyle from "@/styles/base/main"

interface Props {
  splits: string
}

interface Split {
  best: { duration: number }
  duration: number
  finish_time: number
  gold: boolean
  history: number[]
  name: string
  reduced: boolean
  skipped: boolean
}

const SplitsSheet: React.FC<Props> = ({ splits }) => {
  const theme = useColorScheme() ?? "light"

  if (splits) {
    const id = splits.substring(30)

    const { data, isLoading, error } = useQuery<Splits>({
      queryKey: ["getSplit", splits.substring(30)],
      queryFn: async () => {
        if (!id) throw new Error("Missing ID")
        return await splitIOService.getSplit(id)
      },
      enabled: !!id,
    })

    const getSplits = (data: Split[]) => {
      if (data && data.length > 0) {
        const splits = data.map((split, idx) => {
          return (
            <View key={idx} style={splitsStyle.cardSplit}>
              <Text
                style={[
                  splitsStyle.textSplit,
                  theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
                ]}
              >
                {split.name}
              </Text>
              <Runtime time={split.finish_time} />
            </View>
          )
        })
        return splits
      }
      return null
    }

    if (error) {
      return <CatchError error={error} />
    }

    return (
      <Fragment>
        {isLoading ? (
          <IsLoading isLoading={isLoading} />
        ) : (
          <Fragment>
            {data && data.run.splits.length > 0 ? (
              <View style={splitsStyle.cardInfo}>
                <View style={splitsStyle.cardTitle}>
                  <MaterialCommunityIcons
                    name="clock-fast"
                    size={Utils.moderateScale(28)}
                    color={
                      theme == "dark" ? Colors.dark.icon : Colors.light.icon
                    }
                  />
                  <Text
                    style={[
                      splitsStyle.textTitle,
                      theme === "dark"
                        ? mainStyle.themeDark
                        : mainStyle.themeLight,
                    ]}
                  >
                    Splits
                  </Text>
                </View>
                {getSplits(data?.run?.splits)}
              </View>
            ) : null}
          </Fragment>
        )}
      </Fragment>
    )
  }
  return null
}

export default SplitsSheet
