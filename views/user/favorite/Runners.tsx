import Header from "@/components/lib/Header"
import mainStyle from "@/styles/base/main"
import React, { useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { Favorite, Favorites } from "@/types/speedhub"
import { favoriteUserService } from "@/services/speedhub"
import CatchError from "@/components/lib/CatchError"
import Utils from "@/components/lib/Utils"
import { Chevron, Dots } from "@/components/lib/Icons"
import useHandleFavorite from "@/hooks/user/useHandleFavorite"
import AlertMessage from "@/components/lib/AlertMessage"
import BottomModal from "@/components/lib/Modal"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import ROUTES from "@/components/routes"
import { useModalAction } from "@/contexts/ModalContext"

const defaultUserImg = require("../../../assets/images/default.png")

const RunnerItem = ({
  runner,
  userId,
  selectedRunner,
  setSelectedRunner,
}: {
  runner: Favorite
  userId: string | undefined
  selectedRunner: Favorite | null
  setSelectedRunner: (runner: Favorite) => void
}) => {
  const { closeModal, openModal } = useModalAction()

  const { handleRedirect } = useHandleRouter()
  const { removeFavorite } = useHandleFavorite({
    data: {
      userId,
      type: "Runner",
      data: {
        id: runner.id,
        image: runner.image,
        name: runner.name,
      },
    },
  })

  const title = `Delete ${runner.name}`
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
    <View style={style.listItem}>
      {runner.image ? (
        <Image source={{ uri: runner.image }} style={style.image} />
      ) : (
        <Image source={defaultUserImg} style={style.image} />
      )}
      <Text style={style.text}>{runner.name}</Text>
      <TouchableOpacity
        onPress={() => {
          setSelectedRunner(runner), openModal()
        }}
      >
        <Dots />
      </TouchableOpacity>
      {selectedRunner?.id === runner.id && (
        <BottomModal title={runner.name}>
          <TouchableOpacity
            style={style.modalContainer}
            onPress={() => {
              handleRedirect(ROUTES.ONE_USER, { id: selectedRunner.id }).then(
                () => {
                  closeModal()
                }
              )
            }}
          >
            <Text style={style.modalText}>View</Text>
            <Chevron />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.modalContainer}
            onPress={() => {
              AlertMessage({ title, message, buttons }), closeModal()
            }}
          >
            <Text style={[style.modalText, { color: "red" }]}>Delete</Text>
            <Chevron />
          </TouchableOpacity>
        </BottomModal>
      )}
    </View>
  )
}

export default function Runners() {
  const { user } = useAuth()

  const userId = user?.userId

  const { data, isLoading, error, refetch } = useQuery<Favorites>({
    queryKey: ["searchFavorites", userId],
    queryFn: async () => {
      if (userId) return await favoriteUserService.searchFavorites(userId)
      return { favorites: { data: { runners: [] } } }
    },
    enabled: !!userId,
  })

  const [selectedRunner, setSelectedRunner] = useState<Favorite | null>(null)

  if (error) {
    return <CatchError error={error} />
  }

  if (data === undefined && !isLoading) {
    refetch()
  }

  const runners = data?.favorites.data.runners ?? []

  return (
    <View style={mainStyle.container}>
      <Header backButton={true} />
      {runners?.length === 0 ? <CatchError message={"No Favorites"} /> : null}
      {runners.map((runner, idx) => (
        <RunnerItem
          key={idx}
          runner={runner}
          userId={userId}
          selectedRunner={selectedRunner}
          setSelectedRunner={setSelectedRunner}
        />
      ))}
    </View>
  )
}

const style = StyleSheet.create({
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: Utils.moderateScale(10),
    borderTopWidth: Utils.moderateScale(1),
  },
  text: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
  },
  image: {
    width: Utils.moderateScale(60),
    height: Utils.moderateScale(60),
  },
  modalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: Utils.moderateScale(20),
  },
  modalText: {
    fontSize: Utils.moderateScale(16),
  },
})
