import Header from "@/components/lib/Header"
import mainStyle from "@/styles/base/main"
import React, { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { Favorite, Favorites } from "@/types/speedhub"
import { favoriteUserService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"
import { useModalAction } from "@/contexts/ModalContext"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import useHandleFavorite from "@/hooks/user/useHandleFavorite"
import favoriteStyle from "@/styles/views/favorites"
import { Image, Text, TouchableOpacity, View } from "react-native"
import AlertMessage from "@/components/lib/AlertMessage"
import BottomModal from "@/components/lib/Modal"
import ROUTES from "@/components/routes"
import { Chevron, Dots } from "@/components/lib/Icons"

const defaultUserImg = require("../../../assets/images/default.png")

const GameItem = ({
  game,
  userId,
  selectedGame,
  setSelectedGame,
}: {
  game: Favorite
  userId: string | undefined
  selectedGame: Favorite | null
  setSelectedGame: (game: Favorite) => void
}) => {
  const { closeModal, openModal } = useModalAction()

  const { handleRedirect } = useHandleRouter()
  const { removeFavorite } = useHandleFavorite({
    data: {
      userId,
      type: "Game",
      data: {
        id: game.id,
        image: game.image,
        name: game.name,
      },
    },
  })

  const title = `Delete ${game.name}`
  const message = "Are you sure you want to delete this favorite ?"
  const buttons = [
    {
      text: "Yes",
      onPress: () => removeFavorite.mutate(),
    },
    {
      text: "No",
    },
  ]

  return (
    <View style={favoriteStyle.listItem}>
      {game.image ? (
        <Image source={{ uri: game.image }} style={favoriteStyle.image} />
      ) : (
        <Image source={defaultUserImg} style={favoriteStyle.image} />
      )}
      <Text style={favoriteStyle.text}>{game.name}</Text>
      <TouchableOpacity
        onPress={() => {
          setSelectedGame(game), openModal()
        }}
      >
        <Dots />
      </TouchableOpacity>
      {selectedGame?.id === game.id && (
        <BottomModal title={game.name}>
          <TouchableOpacity
            style={favoriteStyle.modalContainer}
            onPress={() => {
              if (selectedGame)
                handleRedirect(ROUTES.ONE_GAME, { id: selectedGame.id }).then(
                  () => {
                    closeModal()
                  }
                )
            }}
          >
            <Text style={favoriteStyle.modalText}>View</Text>
            <Chevron />
          </TouchableOpacity>
          <TouchableOpacity
            style={favoriteStyle.modalContainer}
            onPress={() => {
              AlertMessage({ title, message, buttons }), closeModal()
            }}
          >
            <Text style={[favoriteStyle.modalText, { color: "red" }]}>
              Delete
            </Text>
            <Chevron />
          </TouchableOpacity>
        </BottomModal>
      )}
    </View>
  )
}

export default function Games() {
  const { user } = useAuth()

  const userId = user?.userId

  const { data, isLoading, error, refetch } = useQuery<Favorites>({
    queryKey: ["searchFavorites", userId],
    queryFn: async () => {
      if (userId) return await favoriteUserService.searchFavorites(userId)
      return { favorites: { data: { games: [] } } }
    },
    enabled: !!userId,
  })

  const [selectedGame, setSelectedGame] = useState<Favorite | null>(null)

  if (error) {
    return <CatchError error={error} />
  }

  if (data === undefined && !isLoading) {
    refetch()
  }

  const games = data?.favorites.data.games ?? []

  return (
    <View style={mainStyle.container}>
      <Header backButton={true} />
      {games?.length === 0 ? <CatchError message={"No Favorites"} /> : null}
      {games.map((game, idx) => (
        <GameItem
          key={idx}
          game={game}
          userId={userId}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
        />
      ))}
    </View>
  )
}
