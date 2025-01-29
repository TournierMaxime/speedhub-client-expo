import React, { useState, Fragment } from "react"
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Filter } from "./Icons"
import Utils from "./Utils"
import Chip from "./Chip"

interface Props {
  children: React.ReactNode
  title: string
  icon?: boolean
}

const BottomModal: React.FC<Props> = ({ children, title, icon }) => {
  const [isVisible, setIsVisible] = useState(false)

  const openModal = () => {
    setIsVisible(true)
  }

  const closeModal = () => {
    setIsVisible(false)
  }

  return (
    <Fragment>
      <TouchableOpacity style={styles.openButton} onPress={openModal}>
        {icon === true ? <Filter /> : <Chip title={title} />}
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <TouchableOpacity onPress={closeModal} />
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>{children}</View>
          </View>
        </View>
      </Modal>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  openButton: {
    display: "flex",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: Utils.moderateScale(20),
    borderTopRightRadius: Utils.moderateScale(20),
    padding: Utils.moderateScale(20),
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Utils.moderateScale(10),
  },
  modalTitle: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
  },
  closeButton: {
    color: "red",
    fontWeight: "bold",
  },
  modalContent: {
    display: "flex",
    alignItems: "center",
  },
})

export default BottomModal
