import React from "react";
import { View, Text, Image } from "react-native";
import style from "../style";
import { LinearGradient } from 'expo-linear-gradient';



export default class Header extends React.Component {


    render() {
        return (
            <View style={{ height: 106, width: "100%" }}>
                <LinearGradient colors={['#3867D5', '#81C7F5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: "100%", display: "flex", alignItems: "center", flexDirection: "column-reverse" }}>
                    <View style={{ position: 'absolute', width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ backgroundColor: "'rgba(255, 255, 255, .17)'", height: 211, width: 211, borderRadius: 211 / 2, marginTop: -105, marginLeft: -80 }} />
                        <View style={{ backgroundColor: "'rgba(255, 255, 255, .17)'", height: 93, width: 93, borderRadius: 93 / 2, marginTop: -18, marginLeft: -18 }} />
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", width:"90%", marginBottom:10}}>
                        <View style={{display: "flex", flexDirection: "column", justifyContent: "space-around",}}>
                            <Text style={{fontSize:17, color:"white"}}>Hello Hector!</Text>
                            <Text style={{fontSize:10, color:"white"}}>Today you have no reminders</Text>
                        </View>
                        <Image source={require('../assets/profile.jpg')} style={{width: 40, height:40, borderRadius: 40 / 2,}} />
                    </View>
                </LinearGradient>
            </View>
        )
    }


}
