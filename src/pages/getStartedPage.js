import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import styles from '../style.js';

export default class GetStartedPage extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F9FCFF" }}>
        <Image source={require('../assets/NoteBook.png')} />
        <Text style={ styles.headerText}>Reminders made simple</Text>
        <Text style={ styles.text }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque erat in blandit luctus.</Text>
        <TouchableOpacity onPress={this.handlPress}>
          <Text style={button_styles.button}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const button_styles = StyleSheet.create({
  button: {
    minWidth: "75%",
    backgroundColor: '#5DE61A',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 15,
    fontWeight: "700",
    overflow: 'hidden',
    textAlign: 'center',
    padding: "4%"


  }
});  
