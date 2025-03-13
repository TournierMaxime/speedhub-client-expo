import Header from "@/components/lib/Header"
import mainStyle from "@/styles/base/main"
import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { Favorite, Favorites } from "@/types/speedhub"
import { favoriteUserService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"
import AlertMessage from "@/components/lib/AlertMessage"
import BottomModal from "@/components/lib/Modal"
import ROUTES from "@/components/routes"
import { Chevron, Dots } from "@/components/lib/Icons"
import { useModalAction } from "@/contexts/ModalContext"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import useHandleFavorite from "@/hooks/user/useHandleFavorite"
import favoriteStyle from "@/styles/views/favorites"
import { GetStream } from "@/types/twitch"
import { twitchApiService } from "@/services/twitch"

const defaultUserImg = require("../../../assets/images/default.png")

const MarathonItem = ({
  marathon,
  userId,
  selectedMarathon,
  setSelectedMarathon,
}: {
  marathon: Favorite
  userId: string | undefined
  selectedMarathon: Favorite | null
  setSelectedMarathon: (game: Favorite) => void
}) => {
  const { closeModal, openModal } = useModalAction()

  const { handleRedirect } = useHandleRouter()
  const { removeFavorite } = useHandleFavorite({
    data: {
      userId,
      type: "Marathon",
      data: {
        id: marathon.id,
        image: marathon.image,
        name: marathon.name,
        twitchChannel: marathon.twitchChannel,
      },
    },
  })

  const title = `Delete ${marathon.name}`
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

  const twitchChannel = marathon.twitchChannel

  const { data, isLoading, error, refetch } = useQuery<GetStream | undefined>({
    queryKey: ["getStream", twitchChannel],
    queryFn: async () => {
      if (!twitchChannel) throw new Error("Missing twitchChannel")
      return await twitchApiService.getStream(twitchChannel)
    },
    enabled: !!twitchChannel,
  })

  return (
    <View style={favoriteStyle.listItem}>
      {marathon.image ? (
        <Image source={{ uri: marathon.image }} style={favoriteStyle.image} />
      ) : (
        <Image source={defaultUserImg} style={favoriteStyle.image} />
      )}
      <Text style={favoriteStyle.text}>{marathon.name}</Text>
      <TouchableOpacity
        onPress={() => {
          setSelectedMarathon(marathon), openModal()
        }}
      >
        <Dots />
      </TouchableOpacity>
      {selectedMarathon?.id === marathon.id && (
        <BottomModal title={marathon.name}>
          <TouchableOpacity
            style={favoriteStyle.modalContainer}
            onPress={() => {
              if (selectedMarathon)
                if (data?.data.length === 0) {
                  handleRedirect(ROUTES.ONE_MARATHON_UPCOMING, {
                    horaroId: selectedMarathon.id,
                  }).then(() => {
                    closeModal()
                  })
                } else {
                  handleRedirect(ROUTES.ONE_MARATHON_LIVE, {
                    horaroId: selectedMarathon.id,
                  }).then(() => {
                    closeModal()
                  })
                }
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

export default function Marathons() {
  const { user } = useAuth()

  const userId = user?.userId

  const { data, isLoading, error, refetch } = useQuery<Favorites>({
    queryKey: ["searchFavorites", userId],
    queryFn: async () => {
      return await favoriteUserService.searchFavorites(userId ?? "")
    },
    enabled: !!userId,
  })

  const [selectedMarathon, setSelectedMarathon] = useState<Favorite | null>(
    null
  )

  if (error) {
    return <CatchError error={error} />
  }

  if (data === undefined && !isLoading) {
    refetch()
  }

  const marathons = data?.favorites.data.marathons

  return (
    <View style={mainStyle.container}>
      <Header backButton={true} />
      {marathons?.length === 0 ? <CatchError message={"No Favorites"} /> : null}
      {marathons?.map((marathon: Favorite, idx: number) => {
        return (
          <MarathonItem
            key={idx}
            marathon={marathon}
            userId={userId}
            selectedMarathon={selectedMarathon}
            setSelectedMarathon={setSelectedMarathon}
          />
        )
      })}
    </View>
  )
}
