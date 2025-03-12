import { AlertButton, Alert, AlertOptions, Linking } from "react-native"

export const redirectAlertMessage = async (url: string) => {
  const canOpenUrl = await Linking.canOpenURL(url)
  let message
  if (canOpenUrl === true) {
    message = Alert.alert(
      "Redirection link",
      "You will be redirect to " + url + " are you sure to continue ?",
      [
        {
          text: "Yes",
          onPress: () => Linking.openURL(url),
        },
        {
          text: "No",
        },
      ]
    )
  }
}

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
