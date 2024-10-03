import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/login/Login";
import { useEffect, useState } from "react";
import {  getPermisionsView, observePermissions } from "../database/helpers/permissionsHelper";
import { PermissionModel } from "../database/model";
import { useAuthStore } from "../stores/auth/auth-store";
import { Home } from "../screens/Home/Home";
import { SplashScreen } from "../screens/Splash/SplashScreen";

const Stack = createNativeStackNavigator();

const SplashScreenStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="SplashScreen"
        >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
    )
} // navegacion para la pantalla de carga

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Login"
        >
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>

    )
} // navegacion para la autenticacion (login)

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
} // navegacion para la aplicacion


export const Navigator = () => {

    const [permisionView, setPermisionView] = useState(false);
    const isAuth = useAuthStore(state => state.isAuth);

    const getPermisions = (permissions: PermissionModel[] ) => {
        
        if (permissions) {
            if (permissions.length > 0) {
                const permision = permissions[0] as PermissionModel;
                if (permision.read) {
                    setPermisionView(true)
                }
            }
        }
    }

    useEffect(() => {
        const suscription = observePermissions().subscribe((data) => { 
            getPermisions(data);
        });

        return () => {
            suscription.unsubscribe();
        }
    }, []);

    if (isAuth) {
        if (permisionView) {
            return <AppStack />
        } else {
            return <SplashScreenStack />
        }
        
    } else {
        return <AuthStack />
    }
} // navegacion principal de la aplicacion
