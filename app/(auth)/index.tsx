import { Redirect } from 'expo-router'
import React from 'react'

export default function IndexAuth() {
    return <Redirect href={"/login"} />
}
