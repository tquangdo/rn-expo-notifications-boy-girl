import * as React from 'react'

import styled from 'styled-components'
import { Text, TouchableOpacity, View } from 'react-native'
import { Header, Input, Button } from 'react-native-elements'
import { onSendPushNotification, onGetToken, IFToken } from '../services/api'
import { CompPage, CompHeading } from '../components'

const CompActionContainer = styled(View)`
  margin-top: 50px;
`

const CompButtonContainer = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const CompSummonButton = styled(TouchableOpacity) <{ arg_color?: string }>`
  flex: 48% 0 0;
  background-color: ${props => props.arg_color || 'red'};
  border-radius: 5px;
  text-align: center;
  margin-bottom: 10px;
  display: flex;
  height: 150px;
  align-items: center;
  justify-content: center;
  color: white;
`
const CompSummonButtonText = styled(Text)`
  color: white;
  font-size: 18px;
`

const GirlScreen: React.FC = () => {
    const [staTokenInput, setStaTokenInput] = React.useState('')
    const [staToken, setStaToken] = React.useState<IFToken | undefined>()

    const onGetTokenFromId = async (arg_token_id: string) => {
        const storedToken = await onGetToken(arg_token_id)
        if (storedToken) {
            setStaToken(storedToken)
        } else {
            alert('KO tồn tại mã số này!!!')
        }
    }

    return (
        <>
            <Header centerComponent={{ text: 'Cho bạn nữ 👧', style: { color: '#fff' } }} />

            <CompPage>
                {staToken ? (
                    <View>
                        <CompHeading>Mã số của gấu đực là {staToken.id}.</CompHeading>
                        <CompHeading>Có thể triệu hồi gấu 👦!</CompHeading>
                        <Button title="Nhập mã số mới!" onPress={() => setStaToken(undefined)} type="outline" />
                    </View>
                ) : (
                    <View>
                        <Input
                            label="Mã số gấu 👦"
                            value={staTokenInput}
                            onChangeText={setStaTokenInput}
                            placeholder="Nhập mã số của gấu đực vào đây!"
                        />
                        <Button title="Xác nhận mã số"
                            onPress={() => onGetTokenFromId(staTokenInput)}
                        />
                    </View>
                )}

                {staToken && (
                    <CompActionContainer>
                        <CompHeading>Triệu hồi gấu 👦</CompHeading>

                        <CompButtonContainer>
                            <CompSummonButton
                                arg_color="#e74c3c"
                                onPress={() =>
                                    onSendPushNotification(
                                        staToken.token,
                                        '🍱 Em đói quá',
                                        'Qua chở em đi ăn đi em đói quá 😞.'
                                    )
                                }
                            >
                                <CompSummonButtonText>🍱Em đói quá</CompSummonButtonText>
                            </CompSummonButton>
                            <CompSummonButton
                                arg_color="#2980b9"
                                onPress={() =>
                                    onSendPushNotification(
                                        staToken.token,
                                        '🧋 Thèm trà sữa',
                                        'Huhu em thèm Phúc Long Gong Cha 😞'
                                    )
                                }
                            >
                                <CompSummonButtonText>🥤Thèm trà sữa</CompSummonButtonText>
                            </CompSummonButton>
                            <CompSummonButton
                                arg_color="#2ecc71"
                                onPress={() =>
                                    onSendPushNotification(staToken.token, '😢 Nhớ anh quá', 'Nhớ anh ghê ahuhu 😞!')
                                }
                            >
                                <CompSummonButtonText>😢Nhớ anh quá</CompSummonButtonText>
                            </CompSummonButton>
                            <CompSummonButton
                                arg_color="#f1c40f"
                                onPress={() =>
                                    onSendPushNotification(
                                        staToken.token,
                                        '📱 Gọi e nha',
                                        'Sao qua giờ không gọi, không nhớ e à 😤!'
                                    )
                                }
                            >
                                <CompSummonButtonText>📱Gọi e nha</CompSummonButtonText>
                            </CompSummonButton>
                        </CompButtonContainer>
                    </CompActionContainer>
                )}
            </CompPage>
        </>
    )
}

export default GirlScreen