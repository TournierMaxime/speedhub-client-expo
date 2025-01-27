import React from "react"
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Switch,
  Image,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native"
import useOnChange from "../../hooks/utils/useOnChange"
import Utils from "./Utils"
import { DataState } from "@/hooks/auth/interface"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import Checkbox from "expo-checkbox"

type SetFormData = React.Dispatch<React.SetStateAction<DataState>>

const TypeSubmitStyles = {
  info: { backgroundColor: "blue", color: "white" },
  success: { backgroundColor: "green", color: "white" },
  warning: { backgroundColor: "orange", color: "white" },
  error: { backgroundColor: "red", color: "white" },
} as const

type TypeSubmit = keyof typeof TypeSubmitStyles

class Form {
  static validateField(type?: string, value?: string) {
    if (!value) {
      return { isValid: false, error: "This field is required" }
    }

    switch (type) {
      case "email":
        if (!Utils.isValidEmail(value)) {
          return { isValid: false, error: "Invalid email format" }
        }
        break

      case "password":
        if (!Utils.isValidPassword(value)) {
          return { isValid: false, error: "Invalid password format" }
        }
        break

      case "number":
        if (isNaN(Number(value))) {
          return { isValid: false, error: "Must be a number" }
        }
        break

      default:
        break
    }

    return { isValid: true, error: "" }
  }

  static inputText = (
    data: DataState,
    setData: SetFormData,
    label: string,
    name: keyof DataState,
    value: string,
    secure: boolean,
    readOnly: boolean,
    type?: string,
    css?: StyleProp<TextStyle>
  ) => {
    const theme = useColorScheme() ?? "light"
    const { onChange } = useOnChange({ data, setData })

    const { isValid, error } = this.validateField(type, value)
    const borderColor = !value ? "grey" : isValid ? "green" : "red"

    return (
      <View style={style.inputContainer}>
        <TextInput
          placeholder={label}
          placeholderTextColor={
            theme === "dark" ? Colors.dark.text : Colors.light.text
          }
          onChangeText={(text) => onChange({ name, value: text })}
          value={value}
          editable={!readOnly}
          style={[
            style.textInput,
            { borderColor },
            theme === "dark"
              ? { color: Colors.dark.text }
              : { color: Colors.light.text },
            css,
          ]}
          secureTextEntry={secure}
        />
        <Text style={{ color: "red", fontSize: Utils.moderateScale(14) }}>
          {error}
        </Text>
      </View>
    )
  }

  static inputNumber = (
    data: DataState,
    setData: SetFormData,
    label: string,
    name: keyof DataState,
    value: string,
    type: string
  ) => {
    const theme = useColorScheme() ?? "light"
    const { onChange } = useOnChange({ data, setData })

    const { isValid, error } = this.validateField(type, value)
    const borderColor = !value ? "grey" : isValid ? "green" : "red"

    return (
      <View style={style.inputContainer}>
        <TextInput
          placeholder={label}
          placeholderTextColor={
            theme === "dark" ? Colors.dark.text : Colors.light.text
          }
          onChangeText={(text) => onChange({ name, value: Number(text) })}
          value={value}
          keyboardType="numeric"
          maxLength={6}
          style={[
            style.textInput,
            { borderColor },
            theme === "dark"
              ? { color: Colors.dark.text }
              : { color: Colors.light.text },
          ]}
        />
        <Text style={{ color: "red", fontSize: Utils.moderateScale(14) }}>
          {error}
        </Text>
      </View>
    )
  }

  static checkBox = (
    data: DataState,
    setData: SetFormData,
    label: string,
    name: keyof DataState,
    value: string
  ) => {
    const { handleCheckboxChange } = useOnChange({ data, setData })

    return (
      <TouchableOpacity
        onPress={() => handleCheckboxChange({ name, value })}
        style={style.option}
      >
        <Checkbox
          value={value === data.option?.value}
          onValueChange={() => handleCheckboxChange({ name, value })}
        />
        <Text style={style.optionText}>{label}</Text>
      </TouchableOpacity>
    )
  }

  static inputSwitch = (
    value: boolean,
    fct: (key: string, value: boolean) => void,
    key: string
  ) => {
    return (
      <Switch onValueChange={(newValue) => fct(key, newValue)} value={value} />
    )
  }

  static uploadFile = (
    data: string,
    fct: () => void,
    t: (key: string) => string
  ) => {
    return (
      <View style={""}>
        <View>
          <Image
            source={{
              uri: `${data}?t=${new Date().getTime()}`,
            }}
            style={{
              width: Utils.moderateScale(48),
              height: Utils.moderateScale(48),
            }}
          />
        </View>
        <View>
          <TouchableOpacity style={""} onPress={() => fct()}>
            <Text style={""}>Change avatar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  static submit = (
    type: TypeSubmit,
    label: string,
    fct: () => Promise<void>,
    disabled: boolean
  ) => {
    const { backgroundColor, color } = TypeSubmitStyles[type]

    return (
      <TouchableOpacity
        style={[
          style.btnContainer,
          { backgroundColor },
          disabled && { opacity: 0.5 },
        ]}
        onPress={async () => {
          if (!disabled) {
            await fct()
          }
        }}
        disabled={disabled}
      >
        <Text style={[style.btnLabel, { color }]}>{label}</Text>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  inputContainer: {
    display: "flex",
    marginVertical: Utils.moderateScale(10),
    width: "90%",
  },
  textLabel: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
  },
  textInput: {
    fontSize: Utils.moderateScale(18),
    borderWidth: Utils.moderateScale(1),
    borderRadius: Utils.moderateScale(5),
  },
  btnContainer: {
    display: "flex",
    borderRadius: Utils.moderateScale(5),
    width: "90%",
    alignItems: "center",
    marginVertical: Utils.moderateScale(10),
  },
  btnLabel: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
    marginVertical: Utils.moderateScale(10),
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Utils.moderateScale(10),
  },
  optionText: {
    fontSize: Utils.moderateScale(16),
    marginLeft: Utils.moderateScale(10),
  },
})

export default Form
