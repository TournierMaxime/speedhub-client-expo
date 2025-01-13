import React from "react"
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Switch,
    Image,
    StyleSheet
} from "react-native"
import useOnChange from "../../hooks/utils/useOnChange"
import Utils from "./Utils"
import { DataState } from "@/hooks/auth/useHandleAuth"

type SetFormData = React.Dispatch<React.SetStateAction<DataState>>;

const TypeSubmitStyles = {
    info: { backgroundColor: "blue", color: "white" },
    success: { backgroundColor: "green", color: "white" },
    warning: { backgroundColor: "orange", color: "white" },
    error: { backgroundColor: "red", color: "white" },
} as const;

type TypeSubmit = keyof typeof TypeSubmitStyles;

class Form {
    static inputText = (
        data: DataState,
        setData: SetFormData,
        label: string,
        name: keyof DataState,
        value: string,
        secure: boolean,
        readOnly: boolean
    ) => {
        const { onChange } = useOnChange({ data, setData });

        return (
            <View style={style.inputContainer}>
                <TextInput
                    placeholder={label}
                    onChangeText={(text) => onChange({ name, value: text })}
                    value={value}
                    editable={!readOnly}
                    style={style.textInput}
                    secureTextEntry={secure}
                />
            </View>
        );
    };

    static inputNumber = (
        data: DataState,
        setData: SetFormData,
        label: string,
        name: keyof DataState,
        value: string
    ) => {
        const { onChange } = useOnChange({ data, setData });

        return (
            <View style={style.inputContainer}>
                <TextInput
                    placeholder={label}
                    onChangeText={(text) => onChange({ name, value: Number(text) })}
                    value={value}
                    keyboardType="numeric"
                    maxLength={6}
                    style={style.textInput}
                />
            </View>
        );
    };

    static inputSwitch = (
        value: boolean,
        fct: (key: string, value: boolean) => void,
        key: string,
    ) => {
        return (
            <Switch onValueChange={(newValue) => fct(key, newValue)} value={value} />
        )
    }

    static uploadFile = (
        data: string,
        fct: () => void,
        t: (key: string) => string,
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
                    <TouchableOpacity
                        style={""}
                        onPress={() => fct()}
                    >
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

        const { backgroundColor, color } = TypeSubmitStyles[type];

        return (
            <TouchableOpacity
                style={[
                    style.btnContainer,
                    { backgroundColor },
                    disabled && { opacity: 0.5 },
                ]}
                onPress={async () => {
                    if (!disabled) {
                        await fct();
                    }
                }}
                disabled={disabled}
            >
                <Text style={[style.btnLabel, { color }]}>{label}</Text>
            </TouchableOpacity>
        );
    };
}

const style = StyleSheet.create({
    inputContainer: {
        display: "flex",
        marginVertical: Utils.moderateScale(10),
        width: "90%"
    },
    textLabel: {
        fontSize: Utils.moderateScale(20),
        fontWeight: "bold"
    },
    textInput: {
        fontSize: Utils.moderateScale(18),
        borderWidth: Utils.moderateScale(1),
        borderColor: "black",
        borderRadius: Utils.moderateScale(5)
    },
    btnContainer: {
        display: "flex",
        borderRadius: Utils.moderateScale(5),
        width: "90%",
        alignItems: "center",
        marginVertical: Utils.moderateScale(10)
    },
    btnLabel: {
        fontSize: Utils.moderateScale(18),
        fontWeight: "bold",
        marginVertical: Utils.moderateScale(10)
    }
})

export default Form