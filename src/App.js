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
  ['CE','C'],
  [1,2,3,'/'],
  [4,5,6,'*'],
  [7,8,9,'-'],
  [0,'.','=', '+']
];

export default class ReactCalculator extends Component<{}> {

  constructor(props) {
    super(props);

    this.state = {
      previousInputValue: 0,
      inputValue: 0,
      selectedSymbol: null,
      decimal: null
    }
  }

 _renderInputButtons(){
   let views =[];

   for (var r=0; r<inputButtons.length; r++){
     let row = inputButtons[r];

     let inputRow = [];
     for(var i=0; i < row.length; i++){
       let input = row[i];

       inputRow.push(<InputButton value={input}
                                  key={r + "-" + i}
                                  highlight={this.state.selectedSymbol === input}
                                  onPress={this._onInputButtonPressed.bind(this, input)}/>
      );
     }
      views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
   }

   return views;
 }

 _onInputButtonPressed(input){
   switch (typeof input) {
     case 'number':
          return this._handleNumberInput(input)

    case 'string':
          return this._handleStringInput(input)
   }
 }

 _handleNumberInput(num) {
   let inputValue = (this.state.inputValue * 10) + num;

   this.setState({
        inputValue: inputValue
   })
 }

 _handleStringInput(str){
   switch (str) {
     case '/':
     case '*':
     case '+':
     case '-':
         this.setState({
           selectedSymbol: str,
           previousInputValue: this.state.inputValue,
           inputValue: 0
         });
         break;

     case '=':
         let symbol = this.state.selectedSymbol,
             inputValue = this.state.inputValue,
             previousInputValue = this.state.previousInputValue;

          if(!symbol){
             return;
          }

          this.setState({
               previousInputValue: 0,
               inputValue: eval(previousInputValue + symbol + inputValue),
               selectedSymbol: null
          });

          break;

      case '.':

           this.setState({
             decimal: true,
             selectedSymbol: str,
             previousInputValue:this.state.inputValue
           })

           break;

      case 'CE':
           this.setState({
             previousInputValue: 0,
             inputValue: 0,
             selectedSymbol: null,
             decimal: null
           })
          break;

      case 'C':
               let input = this.state.inputValue
                   previous = this.state.previousInputValue
                   str = this.state.selectedSymbol
          this.setState({
             inputValue:previous,
             previousInputValue: input,
             selectedSymbol: str
          })

       break;

   }
 }

  render() {
    return (
      <View style={Style.rootContainer}>
          <View style={Style.displayContainer}>
            <Text style={Style.displayText}>{this.state.inputValue}</Text>
          </View>
          <View style={Style.inputContainer}>
          {this._renderInputButtons()}
          </View>
      </View>
    );
  }
}
