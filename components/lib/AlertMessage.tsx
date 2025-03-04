import { AlertButton, Alert, AlertOptions } from "react-native"

const AlertMessage = ({
  title,
  message,
  buttons,
  options,
}: {
  title: string
  message?: string
  buttons?: AlertButton[]
  options?: AlertOptions
}) => {
  return Alert.alert(title, message, buttons, options)
}

export default AlertMessage
