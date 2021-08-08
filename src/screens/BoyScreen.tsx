import * as React from 'react'

import * as Notifications from 'expo-notifications'
import { Button, Header } from 'react-native-elements'
import { onSubmitToken, IFToken } from '../services/api'
import { CompPage, CompHeading } from '../components'

async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.getPermissionsAsync()
    if (status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        if (status !== 'granted') {
            alert('Failed to get push token for push notification!')
            return
        }
    }

    const token_from_expo = (await Notifications.getExpoPushTokenAsync()).data
    return token_from_expo
}

const BoyScreen: React.FC = () => { // Function Component, clear declaration of Typescript
    const [sta_token, setSta_Token] = React.useState<IFToken | undefined>()

    React.useEffect(() => {
        const subA = Notifications.addNotificationReceivedListener(() => {
            // console.log(notification)
        })

        const subB = Notifications.addNotificationResponseReceivedListener(() => {
            // console.log(response)
        })
        return () => {
            Notifications.removeNotificationSubscription(subA)
            Notifications.removeNotificationSubscription(subB)
        }
    }, [])

    return (
        <>
            <Header centerComponent={{ text: 'Cho bạn nam 👦', style: { color: '#fff' } }} />

            <CompPage>
                <CompHeading>
                    {sta_token ? `Mã số của bạn là ${sta_token.id}.` :
                        'Bạn chưa có mã số. Bấm để lấy mã!'}
                </CompHeading>
                <Button
                    title="Bấm để lấy mã số"
                    onPress={async () => {
                        const pushToken = await registerForPushNotificationsAsync()
                        if (pushToken) {
                            const storedToken = await onSubmitToken(pushToken)
                            setSta_Token(storedToken)
                        }
                    }}
                />
            </CompPage>
        </>
    )
}

export default BoyScreen
