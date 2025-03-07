import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Utils from "./Utils"

const Button = ({
  name,
  redirect,
}: {
  name: string
  redirect?: () => Promise<void>
}) => {
  return (
    <TouchableOpacity onPress={redirect} style={style.container}>
      <Text style={style.text}>{name}</Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
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
