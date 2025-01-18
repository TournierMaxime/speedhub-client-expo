import React, { Fragment } from "react"
import { View, StyleSheet, Text, ActivityIndicator } from "react-native"
import Utils from "@/components/lib/Utils"
import { splitIOService } from "@/services/speedrunDotCom"
import { useQuery } from "@tanstack/react-query"
import { Splits } from "../interface"
import Runtime from "@/components/lib/RunTime"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

interface Props {
    splits: string
}

const SplitsSheet: React.FC<Props> = ({ splits }) => {
    if (splits) {
        const id = splits.substring(30)

        const { data, isLoading, error } = useQuery<Splits>({
            queryKey: ["getSplit", splits.substring(30)],
            queryFn: async () => {
                if (!id) throw new Error("Missing ID")
                return await splitIOService.getSplit(id)
            },
            enabled: !!id,
        })

        const getSplits = () => {
            if (data) {
                const splits = data.run.splits.map((split, idx) => {
                    return (
                        <View key={idx} style={style.cardSplit}>
                            <Text style={style.textSplit}>{split.name}</Text>
                            <Runtime time={split.finish_time} />
                        </View>
                    )
                })
                return splits
            }
        }

        return (
            <Fragment>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <View style={style.cardInfo}>
                        <View style={style.cardTitle}>
                            <MaterialCommunityIcons
                                name="clock-fast"
                                size={Utils.moderateScale(28)}
                                color="black"
                            />
                            <Text style={style.textTitle}>Splits</Text>
                        </View>
                        {getSplits()}
                    </View>
                )}
            </Fragment>
        )
    }
    return null
}

const style = StyleSheet.create({
    cardInfo: {
        display: "flex",
        flexDirection: "column",
        marginHorizontal: Utils.moderateScale(5),
        marginTop: Utils.moderateScale(10),
        padding: Utils.moderateScale(10),
        borderRadius: Utils.moderateScale(5),
        borderWidth: Utils.moderateScale(2),
        borderColor: "grey",
    },
    cardSplit: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textSplit: {
        fontSize: Utils.moderateScale(16),
        marginVertical: Utils.moderateScale(5),
    },
    textTitle: {
        fontSize: Utils.moderateScale(18),
        marginLeft: Utils.moderateScale(5),
    },
    cardTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
})

export default SplitsSheet
