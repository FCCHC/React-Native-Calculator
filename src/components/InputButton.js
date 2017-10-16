import React, {Component} from 'react';
import { View, Text} from 'react-native';

import Style from '/home/creatur/Documentos/react-native/ReactCalculator/src/StyleSheet.js';

export default class InputButton extends Component {
   render() {
     return(
     <View style={Style.inputButton}>
        <Text style={Style.inputButtonText}>{this.props.value}</Text>
     </View>
    )
   }
}
