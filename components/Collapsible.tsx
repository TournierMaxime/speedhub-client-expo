import { PropsWithChildren, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"
import Utils from "./lib/Utils"

export function Collapsible({
  children,
  title,
  onToggle,
}: PropsWithChildren & {
  title: string
  onToggle?: (isOpen: boolean) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useColorScheme() ?? "light"

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.headingContainer}
        onPress={() => {
          setIsOpen((prev) => {
            const newState = !prev
            if (onToggle) {
              onToggle(newState)
            }
            return newState
          })
        }}
        activeOpacity={Utils.moderateScale(0.8)}
      >
        <View style={styles.heading}>
          <IconSymbol
            name="chevron.right"
            size={Utils.moderateScale(18)}
            weight="medium"
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
            style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
          />
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
        </View>
      </TouchableOpacity>
      {isOpen && <View style={styles.contentContainer}>{children}</View>}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  headingContainer: {
    width: "100%",
    display: "flex",
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Utils.moderateScale(6),
    padding: Utils.moderateScale(10),
  },
  contentContainer: {
    marginTop: Utils.moderateScale(10),
    flexDirection: "row", // Aligne les enfants sur une ligne
    flexWrap: "wrap", // Permet aux éléments de passer à la ligne
    gap: Utils.moderateScale(8), // Ajoute de l'espace entre les éléments
  },
})
