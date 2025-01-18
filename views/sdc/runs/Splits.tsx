import React from 'react'
import { View, StyleSheet } from 'react-native'
import Utils from '@/components/lib/Utils'
import { splitIOService } from '@/services/speedrunDotCom'
import { useQuery } from '@tanstack/react-query'

interface Props {
    splits: string
}

const Splits: React.FC<Props> = ({ splits }) => {
    if (splits) {
        const id = splits.substring(30)
        const { data, isLoading, error } = useQuery({
            queryKey: ["getSplit", splits.substring(30)],
            queryFn: async () => {
                if (!id) throw new Error("Missing ID")
                return await splitIOService.getSplit(id)
            },
            enabled: !!id,
        })
        console.log("split", data);

        return (
            <View style={style.cardInfo}>

            </View>
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
    }
})

export default Splits