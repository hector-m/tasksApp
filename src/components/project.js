import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';


export default class Project extends React.Component {

    state = {
        selected: Boolean,
        reminder: Boolean,
        toggleText: String,
    }

    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            reminder: false,
        };
        this.currentlyOpenSwipeable = null;

    }
    render() {

        return (
            <TouchableOpacity>
                <View style={styles.card}>
                <Icon
                    name={this.props.icon}
                    reverse
                    type='font-awesome'
                    color={this.props.color + "36"}
                    reverseColor={this.props.color}
                    size={35} />

                <Text style={styles.text}>{this.props.title}</Text>
                <Text style={styles.subtext}>{this.props.tasks.length} Tasks</Text>

            </View>
            </TouchableOpacity>
            


        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: 160,
        height: 180,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        shadowColor: "#BBBBBB",
        shadowOffset: { width: 0, height: 7 },
        shadowRadius: 11,
        shadowOpacity: .35,
        borderRadius: 5
    },
    text: {
        fontSize: 17,
        fontWeight: "500",
        color: "#686868",
    },
    subtext: {
        fontSize: 10,
        color: "#A1A1A1",
    }
});  