import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';


export default class Task extends React.Component {

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

    getProjectColor = () => {
        let projects = { 1: "#FFD506", 2: "#5DE61A", 3: "#D10263" }
        return projects[this.props.project]
    }

    handleCompleted = () => {
        const { selected } = this.state;
        if (selected) {
            this.setState({ selected: false });
        } else {
            this.setState({ selected: true });
        }
    };

    handleReminder = () => {
        const { reminder } = this.state;
        if (reminder) {
            this.setState({ reminder: false });
        } else {
            this.setState({ reminder: true });
        }
    };

    handleDelete = () => {
        console.warn(this.props.id)
        this.currentlyOpenSwipeable.recenter()
    }


    rightButtons = [
        <TouchableOpacity style={{ paddingLeft: 8, height: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Icon
                reverse
                name='trash-o'
                type='font-awesome'
                color={"#FFCFCF"}
                reverseColor="#FB3636"
                iconStyle={{ marginHorizontal: 10 }}
                size={20}
                onPress={this.handleDelete} />
        </TouchableOpacity>

    ];

    



    render() {

        return (
            <Swipeable 
                onRef={ref => this.currentlyOpenSwipeable = ref} 
                rightButtons={this.rightButtons}>
                <View style={{ backgroundColor: this.getProjectColor(), height: 55, marginVertical: 5, paddingLeft: "2%" }}>
                    <View style={{ width: "100%", height: "100%", backgroundColor: "white", display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={this.handleCompleted} style={[this.state.selected ? styles.selected : styles.empty, { marginHorizontal: 10, }]} />
                        <Text style={{ color: "#C6C6C8", marginRight: 14 }}>{this.props.start}</Text>
                        <Text style={this.state.selected ? styles.text_selected : styles.text} >{this.props.title}</Text>
                        <Icon
                            name='bell'
                            type='font-awesome'
                            color={this.state.reminder ? "#FFDC00" : "#D9D9D9"}
                            iconStyle={{ marginHorizontal: 10 }}
                            size={18}
                            onPress={this.handleReminder} />

                    </View>

                </View>
            </Swipeable>

        )
    }
}

const styles = StyleSheet.create({
    empty: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderColor: "#B5B5B5",
        borderWidth: 2
    },
    selected: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#91DC5A"

    },
    text: {
        fontSize: 14,
        fontWeight: "500",
        color: "#554E8F",
        flex: 1
    },
    text_selected: {
        fontSize: 14,
        fontWeight: "500",
        color: "#D9D9D9",
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        flex: 1
    }
});  