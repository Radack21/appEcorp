import { View } from "react-native"
import { ActivityIndicator, Text } from "react-native-paper"
import { Image } from "react-native"

export const SplashScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >   
            <Image source={require('../../assets/images/screen.png')} style={{
                position: 'absolute',
                flex: 1,
            }} />
            <ActivityIndicator animating={true} size={'large'} color="#000" />
        </View>
    )
}
