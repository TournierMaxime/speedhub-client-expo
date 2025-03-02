import { Text, View, TouchableOpacity, ScrollView } from "react-native"
import Header from "@/components/lib/Header"
import mainStyle from "@/styles/base/main"
import ROUTES from "@/components/routes"
import { useAuth } from "@/contexts/AuthContext"
import CatchError from "@/components/lib/CatchError"
import { useQuery } from "@tanstack/react-query"
import { favoriteUserService } from "@/services/speedhub"
import { Favorites } from "@/types/speedhub"
import { ProfilePath } from "@/types/speedhub"
import { Runner, GamePad, Time, Chevron } from "@/components/lib/Icons"
import Utils from "@/components/lib/Utils"
import profileStyle from "@/styles/views/profile"
import useHandleRouter from "@/hooks/utils/useHandleRouter"

const AllFavorites = () => {
  const { user } = useAuth()
  const { handleRedirect } = useHandleRouter()

  const userId = user?.userId

  const { data, isLoading, error, refetch } = useQuery<Favorites>({
    queryKey: ["searchFavorites", userId],
    queryFn: async () => {
      return await favoriteUserService.searchFavorites(userId ?? "")
    },
    enabled: !!userId,
  })

  if (error) {
    return <CatchError error={error} />
  }

  if (data === undefined && !isLoading) {
    refetch()
  }

  const items: ProfilePath[] = []

  if (data?.favorites.data.games) {
    items.push({
      path: ROUTES.FAVORITES_GAMES,
      params: undefined,
      title: "Games",
      icon: <GamePad />,
    })
  }

  if (data?.favorites.data.runners) {
    items.push({
      path: ROUTES.FAVORITES_RUNNERS,
      params: undefined,
      title: "Runners",
      icon: <Runner />,
    })
  }

  if (data?.favorites.data.marathons) {
    items.push({
      path: ROUTES.FAVORITES_MARATHONS,
      params: undefined,
      title: "Marathons",
      icon: <Time />,
    })
  }

  return (
    <View style={mainStyle.container}>
      <Header
        backButton={true}
        lastPath={{ pathname: ROUTES.ONE_USER_PROFILE }}
      />
      <ScrollView style={profileStyle.container}>
        {items.map((item, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              style={[
                profileStyle.item,
                idx === 0
                  ? {
                      borderTopWidth: Utils.moderateScale(2),
                      borderBottomWidth: Utils.moderateScale(2),
                    }
                  : {
                      borderBottomWidth: Utils.moderateScale(2),
                    },
              ]}
              onPress={() =>
                item.path
                  ? handleRedirect(item.path, item.params)
                  : item.action
                  ? item.action()
                  : null
              }
            >
              <Text
                style={[
                  profileStyle.itemText,
                  item.title === "Log out" ? { color: "red" } : null,
                ]}
              >
                {item.icon} {item.title}
              </Text>
              <Chevron />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default AllFavorites
