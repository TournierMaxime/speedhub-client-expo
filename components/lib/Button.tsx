import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native"
import Utils from "./Utils"

const Button = ({
  name,
  redirect,
  style,
}: {
  name: string
  redirect?: () => Promise<void>
  style?: StyleProp<ViewStyle>
}) => {
  return (
    <TouchableOpacity onPress={redirect} style={[styles.container, style]}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: Utils.moderateScale(5),
    padding: Utils.moderateScale(10),
  },
  text: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
    color: "white",
  },
})

export default Button
