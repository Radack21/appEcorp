import { useState } from "react";
import { StyleSheet, View } from "react-native"
import { Button, Surface, Text, TextInput, useTheme } from "react-native-paper"
import { useForm, Controller } from 'react-hook-form';
import { Image } from "react-native";
import Wave from "./Wave";
import { useAuthStore } from "../../stores/auth/auth-store";
import EcorpAPI from "../../api/EcorpAPI";
import { AxiosError } from "axios";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { savePermissions } from "../../database/helpers/permissionsHelper";

export const Login = () => {

    const [showPassword, setShowPassword] = useState(true)
    const [loading, setLoading] = useState(false)

    const setIsAuth = useAuthStore(state => state.setIsAuth);
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: 'ilr.jose@gmail.com', password: 'brd7877' } });

    const onSubmit = async (dataLogin: any) => {
        
        try {
            setLoading(true)
            const { data } = await EcorpAPI.post('/proceso/login', dataLogin )

            
            if (data.permisos) {

                const module = Object.keys(data.permisos[0])[0]
                
                const dataPermisions = {
                    view: module,
                    read: data.permisos[0][module][0] == 1 ? true : false,
                    write: data.permisos[0][module][1] == 1 ? true : false,
                    edit: data.permisos[0][module][2] == 1 ? true : false,
                    delete: data.permisos[0][module][3] == 1 ? true : false,
                }

                const result = await savePermissions(dataPermisions)

                setIsAuth(true)
            } else  {
                showMessage({
                    message: 'No tiene permisos',
                    type: 'danger',
                    duration: 4000,
                })
            }
            
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            
            setLoading(false)
            if (error instanceof AxiosError) {
                if(error.response?.status == 401){
                    showMessage({
                        message: 'Credenciales incorrectas',
                        type: 'danger',
                        duration: 4000,
                    })
                } else {
                    console.log(error);
                    
                }
                

            } else {
                console.error(error)
            }
        }
    }

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <FlashMessage position="top" />
            <Wave />
            <Surface style={styles.surface} elevation={5}>
                <View style={ styles.containerImage }>
                    <Image source={require('../../assets/images/icon.png')} style={ styles.image } />
                </View>
                <Text variant="headlineSmall"  style={{ textAlign: 'center'}}>ECORP</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="Email"
                            mode="outlined"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.email}
                            style={{ width: 250 }}
                        />
                    )}
                    name="email"
                    rules={{ required: 'Ingrese su email' }}

                />
                {errors.email && <Text style={{ color: 'red' }}>{errors.email.message?.toString() || ''}</Text>}

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="Password"
                            mode="outlined"
                            secureTextEntry={showPassword}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.password}
                            style={{ width: 250 }}
                            right={<TextInput.Icon icon={'eye'} onPress={() => setShowPassword(!showPassword)} />}

                        />
                    )}
                    name="password"
                    rules={{ required: 'Ingrese su password' }}
                />

                {errors.password && <Text style={{ color: 'red' }}>{errors.password.message?.toString() || ''}</Text>}

                <Button
                    onPress={handleSubmit(onSubmit)}
                    mode="contained"
                    style={errors.password ? {} : { marginTop: 20 }}
                    disabled={Object.keys(errors).length > 0 || loading}
                    loading={loading}
                >
                    Ingresar
                </Button>
                
            </Surface>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    surface: {
        padding: 20,
        borderRadius: 25,
        height: 390,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    containerImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 100,
        width: 100,
    },
    backgroundImagen: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '50%',
        zIndex: -1,
        width: '100%',
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
    }
})
