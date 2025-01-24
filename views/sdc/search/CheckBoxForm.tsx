import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import Form from "@/components/lib/Form"
import { DataState } from "@/hooks/auth/interface"

interface Props {
    setSelectedOptionValue: React.Dispatch<React.SetStateAction<string>>
}

const CheckboxForm: React.FC<Props> = ({ setSelectedOptionValue }) => {
    const [data, setData] = useState<DataState>({
        option: {
            name: "users",
            value: "users"
        }
    })

    const onChange = () => {
        setSelectedOptionValue(data.option?.value ?? "")
    }

    useEffect(() => {
        onChange()
    }, [data.option?.value])

    return (
        <View style={styles.container}>
            <View style={styles.optionContainer}>
                {Form.checkBox(data, setData, "Users", "option", "users")}
                {Form.checkBox(data, setData, "Games", "option", "games")}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
})

export default CheckboxForm