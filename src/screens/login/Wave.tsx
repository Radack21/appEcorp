import * as shape from 'd3-shape';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';
const { height, width } = Dimensions.get('screen');


const dots: [number,number][] = [
    [-width/2, height],
    [ width/5, (height/4)],
    [(width/8)*6, (height/8)*6],
    [(width/4) + width , (height/54)],
    [width + width, height],
]

export default function Wave() {

    const { colors } = useTheme();

    const getPath = () => {
        const path = shape
            .line()
            .x(d => d[0])
            .y(d => d[1])
            .curve(shape.curveBasis)(dots);

        return path || '';
    };
    const d = getPath();

    return (
        <View style={ styles.container }>
            <Svg height={height} width={width} fill={ colors.primary }>
                <Path d={d} />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
    },
});