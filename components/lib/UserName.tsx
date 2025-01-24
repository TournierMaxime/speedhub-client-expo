import React from "react"
/* import { LinearGradient } from "expo-linear-gradient"
import MaskedView from "@react-native-masked-view/masked-view" */
import Utils from "./Utils"
import { DimensionValue, StyleProp, Text, TextStyle } from "react-native"

interface Item {
    names: {
        international: string
    }
    "name-style": {
        style: string
        "color-from": {
            light: string
            dark: string
        }
        "color-to": {
            light: string
            dark: string
        }
        color: {
            light: string
            dark: string
        }
    }
}

interface Props {
    data: Item
    width?: DimensionValue
    height?: DimensionValue
    style?: StyleProp<TextStyle>
    idx?: number
}

const UserName: React.FC<Props> = ({ data, idx, width, height, style }) => {
    return (
        <Text
            key={idx}
            style={[
                {
                    fontSize: Utils.moderateScale(16),
                    fontWeight: "bold",
                    textAlign: "left",
                },
                style,
            ]}
        >
            {data.names?.international}
        </Text>
    )
}

export default UserName

/*
    return (
        <MaskedView
            key={idx}
            style={{ height: height ?? Utils.moderateScale(25), width }}
            maskElement={
                <Text
                    style={[
                        {
                            fontSize: Utils.moderateScale(16),
                            fontWeight: "bold",
                            textAlign: "left",
                        },
                        style,
                    ]}
                >
                    {data.names?.international}
                </Text>
            }
        >
            <LinearGradient
                colors={
                    data["name-style"]?.style === "gradient"
                        ? [
                            data?.["name-style"]?.["color-from"]?.dark,
                            data?.["name-style"]?.["color-from"]?.light,
                            data?.["name-style"]?.["color-to"]?.dark,
                            data?.["name-style"]?.["color-to"]?.light,
                        ]
                        : [
                            data?.["name-style"]?.color?.dark,
                            data?.["name-style"]?.color?.light,
                        ]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
            />
        </MaskedView>
    )
*/
