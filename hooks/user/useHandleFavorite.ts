import useHandleToast from "@/hooks/utils/useHandleToast"
import { useState } from "react"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { useAuth } from "@/contexts/AuthContext"
import { favoriteUserService, authService } from "@/services/speedhub"
import { GetSession } from "@/types/speedhub"

const useHandleFavorite = ({
  data,
}: {
  data: {
    userId: string | undefined
    type: "Runner" | "Game" | "Marathon"
    data: {
      id?: string | undefined
      url?: string | undefined
      image: string | undefined
      name: string | undefined
      twitchChannel?: string | undefined
    }
  }
}) => {
  const { user } = useAuth()
  const { handleError, handleSuccess } = useHandleToast()

  const userId = user?.userId
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const { data: sessionData } = useQuery<GetSession>({
    queryKey: ["getSession", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No user ID")
      return await authService.getSession(userId)
    },
    enabled: !!userId,
  })

  const addFavorite = useMutation({
    mutationFn: async () => {
      if (userId)
        return await favoriteUserService
          .createFavorite({
            userId: data.userId ?? userId,
            type: data.type,
            data: {
              id: data.data.id,
              image: data.data.image,
              name: data.data.name,
              url: data.data.url,
              twitchChannel: data.data.twitchChannel,
            },
          })
          .then(() => {
            setIsFollowing(true),
              handleSuccess("You are following " + data.data.name)
          })
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["searchFavorites", userId] })
      }
    },
  })

  const removeFavorite = useMutation({
    mutationFn: async () => {
      if (userId) {
        if (data?.data.url) {
          return await favoriteUserService
            .deleteFavorite(userId, {
              url: data.data.url,
              type: data.type,
            })
            .then(() => {
              setIsFollowing(false),
                handleSuccess("You have unfollow " + data.data.name)
            })
        } else {
          return await favoriteUserService
            .deleteFavorite(userId, {
              id: data.data.id,
              type: data.type,
            })
            .then(() => {
              setIsFollowing(false),
                handleSuccess("You have unfollow " + data.data.name)
            })
        }
      }
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["searchFavorites", userId] })
      }
    },
  })

  const handleGameFavorite = useMutation({
    mutationFn: async (gameId: string | string[]) => {
      if (sessionData) {
        const game = sessionData?.favorites.data.games.find(
          (r: any) => r.id === gameId
        )
        setIsFollowing(!!game)
        return sessionData.favorites.data.games ?? []
      }
    },
  })

  const handleMarathonFavorite = useMutation({
    mutationFn: async (gameId: string | string[]) => {
      if (sessionData) {
        const marathon = sessionData.favorites?.data?.marathons?.find(
          (r: any) => r.id === gameId
        )
        setIsFollowing(!!marathon)
        return sessionData.favorites.data.marathons ?? []
      }
    },
  })

  const handleRunnerFavorite = useMutation({
    mutationFn: async (gameId: string | string[]) => {
      if (sessionData) {
        const runner = sessionData.favorites?.data?.runners?.find(
          (r: any) => r.id === gameId
        )
        setIsFollowing(!!runner)
        return sessionData.favorites.data.runners ?? []
      }
    },
  })

  return {
    addFavorite,
    removeFavorite,
    isFollowing,
    setIsFollowing,
    handleGameFavorite,
    handleMarathonFavorite,
    handleRunnerFavorite,
  }
}

export default useHandleFavorite
