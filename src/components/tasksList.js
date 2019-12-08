import React from "react";
import { View, Text, SectionList } from "react-native";
import style from "../style";
import Task from "./task.js"

export default class TasksList extends React.Component {

    constructor(props) {
        super(props)
        this.data = Object.keys(this.props.data).map((key) => {
            return { data: this.props.data[key].tasks, day: this.props.data[key].day }
        });
    }

    render() {
        return (
            <View style={{ padding: 18, width:"100%", height:"100%"}}>
                <SectionList
                    renderItem={({ item }) => <Task id={item.id} title={item.title} start={item.start_time} end={item.end_time} project={item.project}/>}
                    renderSectionHeader={({ section }) => <Text style={[style.headerText,{fontSize: 13}]}>{section.day}</Text>}
                    sections={this.data}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View>

        );
    }

}
