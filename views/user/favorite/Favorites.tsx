import { Text, View } from "react-native"
import Header from "@/components/lib/Header"
import mainStyle from "@/styles/base/main"
import ROUTES from "@/components/routes"
import { useAuth } from "@/contexts/AuthContext"
import CatchError from "@/components/lib/CatchError"
import { useQuery } from "@tanstack/react-query"
import { favoriteUserService } from "@/services/speedhub"
import { Favorites } from "@/types/speedhub"

const AllFavorites = () => {
  const { user } = useAuth()

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
  console.log(data?.favorites)
  return (
    <View style={mainStyle.container}>
      <Header
        backButton={true}
        lastPath={{ pathname: ROUTES.ONE_USER_PROFILE }}
      />
      <Text>Favorites</Text>
    </View>
  )
}

export default AllFavorites
