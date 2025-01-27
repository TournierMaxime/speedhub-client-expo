import React, { useState, useRef } from "react"
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native"
import useResponsive from "@/hooks/utils/useResponsive"
import { Filter } from "./Icons"

interface Props {
  children: React.ReactNode
}

const { video } = useResponsive()

const BottomModal: React.FC<Props> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)

  const translateY = useRef(new Animated.Value(video.dimension.h)).current // Start off-screen

  const openModal = () => {
    setIsVisible(true)
    Animated.timing(translateY, {
      toValue: video.dimension.h / 2, // Middle of the screen
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: video.dimension.h, // Move off-screen
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setIsVisible(false))
  }

  return (
    <>
      {/* Button to Open Modal */}
      <TouchableOpacity onPress={openModal}>
        <Filter />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.background} onPress={closeModal} />
          <Animated.View
            style={[styles.modalContainer, { transform: [{ translateY }] }]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Modal Title</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>{children}</View>
          </Animated.View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  overlay: {
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
  },
  background: {
    display: "flex",
  },
  modalContainer: {
    height: video.dimension.h / 2, // Half the screen height
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    color: "red",
    fontWeight: "bold",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default BottomModal
