import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { DataState } from "@/hooks/auth/interface"
import { FormCheckBox } from "@/components/lib/FormValidation"

interface Props {
  setSelectedOptionValue: React.Dispatch<React.SetStateAction<string>>
}

const CheckboxForm: React.FC<Props> = ({ setSelectedOptionValue }) => {
  const [data, setData] = useState<DataState>({
    option: {
      name: "users",
      value: "users",
    },
  })

  const onChange = () => {
    setSelectedOptionValue(data.option?.value ?? "")
  }

  useEffect(() => {
    onChange()
  }, [data.option?.value])

  return (
    <View style={styles.optionContainer}>
      <FormCheckBox
        data={data}
        setData={setData}
        label="Users"
        name="option"
        value="users"
      />
      <FormCheckBox
        data={data}
        setData={setData}
        label="Games"
        name="option"
        value="games"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  optionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
})

export default CheckboxForm
