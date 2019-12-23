import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import SlidingUpPanel from 'rn-sliding-up-panel';


export class HeaderContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggle() {
        const { visible } = this.state
        if (visible) {
            this._panel.hide()
            this.setState({visible: false})
        } else {
            this._panel.show()
            this.setState({visible: true})
        }
    }

    renderPlus() {
        return (
                <Icon
                    name='plus-circle'
                    type='material-community'
                    color='#F857C3'
                    size={66}
                    iconStyle={[styles.addIcon, this.state.visible ? styles.rotate: null]}
                    onPress={() => this.toggle()}
                />
        )
    }

    renderContainer() {
        return (
            <Text>Add new task</Text>
        )
    }
    render() {
        return (
                <View>
                    <SlidingUpPanel 
                        ref={c => this._panel = c}
                        draggableRange={{top: 700, bottom:80}} //80
                        snappingPoints={[80, 700]}
                    >
                        <View style={[styles.slider, this.state.visible?null:styles.transparent]}>
                            {this.renderPlus()}
                            <View style={styles.container}>
                                {this.renderContainer()}
                            </View>
                        </View>
                    </SlidingUpPanel>
                </View>
        )
    }
}


const styles = StyleSheet.create({
    addIcon: {
        shadowColor: "#F456C3",
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: .47,
        position: "absolute",
    },
    rotate: {
        transform: [{rotateZ: '45deg'}]
    },
    transparent: {
        // opacity: 0.0,
    },
    slider: {
        alignSelf: "stretch",
        alignItems: 'center',
        backgroundColor: 'yellow',
        flex: 1,
        borderRadius: 75
    },
    container: {
        paddingTop: 40
    }
});

