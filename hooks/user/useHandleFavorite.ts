import useHandleToast from "@/hooks/utils/useHandleToast"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/contexts/AuthContext"
import { favoriteUserService } from "@/services/speedhub"

const useHandleFavorite = ({
  data,
}: {
  data: {
    userId: string | undefined
    type: "Runner" | "Game" | "Marathon"
    data: {
      id: string | undefined
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
      if (userId && data?.data.id)
        return await favoriteUserService
          .deleteFavorite(userId, {
            id: data.data.id,
            type: data.type,
          })
          .then(() => {
            setIsFollowing(false),
              handleSuccess("You have unfollow " + data.data.name)
          })
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["searchFavorites", userId] })
      }
    },
  })
  return {
    addFavorite,
    removeFavorite,
    isFollowing,
    setIsFollowing,
  }
}

export default useHandleFavorite
