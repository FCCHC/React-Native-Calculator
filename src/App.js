/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Style from '/home/creatur/Documentos/react-native/ReactCalculator/src/StyleSheet.js'
import InputButton from './components/InputButton';

//define the inputButtons that will be on the calculator
const inputButtons = [
  [1,2,3,'/'],
  [4,5,6,'*'],
  [7,8,9,'-'],
  [0,'.','=', '+']
];

export default class ReactCalculator extends Component<{}> {

 _renderInputButtons(){
   let views =[];

   for (var r=0; r<inputButtons.length; r++){
     let row = inputButtons[r];

     let inputRow = [];
     for(var i=0; i < row.length; i++){
       let input = row[i];

       inputRow.push(<InputButton value={input} key={r + "-" + i}/>
      );
     }
      views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
   }

   return views;
 }

  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}></View>
        <View style={Style.inputContainer}>
          {this._renderInputButtons()}
        </View>
      </View>
    );
  }
}
