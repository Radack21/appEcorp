import { SetStateAction, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Surface, Text, TextInput } from "react-native-paper"
import EcorpAPI from "../../api/EcorpAPI"

interface SetValueAction {
    (value: number): void;
}

export const Home = () => {

    const [machine, setMachine] = useState('')
    const [type, setType] = useState<number>(1)
    const [E1, setE1] = useState<number>(NaN)
    const [errorE1, setErrorE1] = useState<boolean>(false)
    const [E2, setE2] = useState<number>(NaN)
    const [errorE2, setErrorE2] = useState<boolean>(false)
    const [S1, setS1] = useState<number>(NaN)
    const [S2, setS2] = useState<number>(NaN)
    const [gapE, setGapE] = useState<number>(NaN)
    const [gapS, setGapS] = useState<number>(NaN)
    const [product, setProduct] = useState<number>(0)

    const getMachine = async () => {
        try {
            const { data } = await EcorpAPI.get(`/proceso/buscarid/${machine}/GUICHO`)
            
            setE2(data[0].mhistorico_E1)
            setS2(data[0].mhistorico_S1)
            setType(data[0].mhistorico_Tipo)

        } catch (error) {
            console.log(error);

        }
    }

    const NumericInput = (text: string, setValue: SetValueAction, type:String) => {
        
        const numericValue = text.replace(/[^0-9]/g, '')
        if (type === "salida") {
            if (+numericValue < S2) {
                setErrorE2(true)
            } else {
                setErrorE2(false)
            }
            setGapS(+numericValue - S2)
            
        }
        if (type === "entrada") {
            
            if (+numericValue < E2) {
                setErrorE1(true)
            } else {
                setErrorE1(false)
            }
            setGapE(+numericValue - E2)
            
        }

        setValue(+numericValue)
    }
    

    useEffect(() => {
        const gap = (gapE - gapS) * type
        if (gap) {
            setProduct(gap)
        }
        
    }, [gapE, gapS])
    

    return (
        <View
            style={styles.container}
        >
            <Surface
                style={styles.surface}
            >


                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >

                        <TextInput
                            label={'Maquina'}
                            mode="outlined"
                            value={machine}
                            onChange={(e) => setMachine(e.nativeEvent.text)}
                            placeholder="Código de maquina"
                        />

                    </View>
                    <View
                        style={{
                            flex: 3
                        }}
                    >

                        <Button
                            onPress={() => getMachine()}
                            mode="contained"
                        >
                            Buscar
                        </Button>
                    </View>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 30,
                        gap: 5,
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >

                        <TextInput
                            label={'Entrada'}
                            mode="outlined"
                            value={E1 ? E1.toString() : ''}
                            onChange={(e) => NumericInput(e.nativeEvent.text,setE1,"entrada")}
                            placeholder="Código de maquina"
                            keyboardType="numeric"
                            error={errorE1}
                        />
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >

                        <TextInput
                            label={'Inicial'}
                            mode="outlined"
                            value={E2 ? E2.toString() : ''}
                            // onChange={(e) => setMachine(e.nativeEvent.text)}
                            placeholder="Código de maquina"
                            disabled
                        />
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            variant="titleMedium"
                        >
                            Diferencia: { gapE ? gapE : 0}
                        </Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >

                        <TextInput
                            label={'Salida'}
                            mode="outlined"
                            value={S1 ? S1.toString() : ''}
                            keyboardType="numeric"
                            onChange={(e) => NumericInput(e.nativeEvent.text,setS1,"salida")}
                            placeholder="Código de maquina"
                            error={errorE2}
                        />
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >

                        <TextInput
                            label={'Inicial'}
                            mode="outlined"
                            value={S2 ? S2.toString() : ''}
                            placeholder="Código de maquina"
                            disabled
                        />
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            variant="titleMedium"
                        >
                            Diferencia: { gapS ? gapS : 0 }
                        </Text>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            variant="titleMedium"
                        >
                            Producto: { product ? product : 0 }
                        </Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            onPress={() => getMachine()}
                            mode="contained"
                        >
                            Enviar
                        </Button>
                    </View>
                </View>
            </Surface>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    surface: {
        flex: 1,
        padding: 8,
        borderRadius: 10,
    }
})