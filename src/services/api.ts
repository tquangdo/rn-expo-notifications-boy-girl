import axios from 'axios'

const TOKEN_SERVER_URL = 'https://gau-server.glitch.me/notifications'
const EXPO_SERVER_URL = 'https://exp.host/--/api/v2/push/send'

export interface IFToken {
    id: number
    token: string
}

export const onSubmitToken = async (token: string) => { // var name phai la "token"
    // anh huong toi KQ cua: https://gau-server.glitch.me/notifications/408
    // {
    //     token: "ExponentPushToken[I4p-wTJw2eRxHFapd6hlCQ]",
    //     id: 408
    // }
    const response = await axios.post(TOKEN_SERVER_URL, { token })
    const result = response.data as IFToken
    return result
}

export const onGetToken = async (id: number | string) => { // var name phai la "id"
    const response = await axios.get(`${TOKEN_SERVER_URL}/${id}`).catch(() => null)
    if (response) {
        const result = response.data as IFToken
        return result
    } else {
        return null
    }

}

export const onSendPushNotification = async (pushToken: string, title: string, body: string) => {
    const message = {
        to: pushToken,
        sound: 'default',
        title,
        body,
    }

    await axios.post(EXPO_SERVER_URL, message) //https://expo.io/notifications
    alert('Triệu hồi gấu 👦 thành công!')
}