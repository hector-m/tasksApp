import React from "react";
import { connect } from "react-redux";
import * as Permissions from "expo-permissions";
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-community/async-storage";
import {
  onNameChanged,
  onIconChanged,
  onSaveNameAndIconToStorage
} from "../redux/actions";
import { getName, getIcon } from "../redux/selectors";
import style from "../style";
import HeaderContainer from "../containers/headerContainer";

class SetUpScreen extends React.Component {
  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  renderNameInput() {
    const { name, onNameChanged } = this.props;
    return (
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "700",
            color: "#554E8F"
          }}
        >
          Add name
        </Text>
        <TextInput
          style={{
            height: 32,
            marginTop: 13,
            fontSize: 20,
            color: "#373737",
            borderBottomWidth: 1,
            borderBottomColor: "#CFCFCF",
            textAlign: "center"
          }}
          autoFocus={false}
          onChangeText={text => onNameChanged(text)}
          value={name}
          maxLength={15}
        />
      </View>
    );
  }

  renderTextBody() {
    return (
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: "#554E8F",
            fontWeight: "600"
          }}
        >
          Welcome to Reminders
        </Text>
        <Text style={style.text}>
          To personalize your experience we ask for a name and profile picture.
        </Text>
      </View>
    );
  }

  onButtonPress = async () => {
    const { name, icon, onSaveNameAndIconToStorage } = this.props;
    try {
      t = await AsyncStorage.setItem("@Name", name);
      i = await AsyncStorage.setItem("@Icon", icon);
      onSaveNameAndIconToStorage();
    } catch (e) {
      console.log(e);
    }
  };

  renderButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          shadowColor: "#66C81C",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          shadowRadius: 30,
          width: "75%"
        }}
        onPress={() => {
          this.onButtonPress();
          this.props.navigation.navigate("App");
        }}
      >
        <LinearGradient
          colors={["#5DE61A", "#39A801"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 62
          }}
        >
          <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>
            Get Started
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  _pickImage = async () => {
    const { onIconChanged } = this.props;
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      });
      if (!result.cancelled) {
        onIconChanged(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <>
        <HeaderContainer navigation={navigation} />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
            marginVertical: 60,
            backgroundColor: "#F9FCFF"
          }}
        >
          <View>
            <TouchableOpacity onPress={this._pickImage}>
              <Image
                source={{ uri: this.props.icon }}
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 80,
                  margin: 20
                }}
              />
            </TouchableOpacity>

            {this.renderNameInput()}
          </View>
          {this.renderTextBody()}
          {this.renderButton()}
        </View>
      </>
    );
  }
}

const mapStateToProps = state => ({
  name: getName(state),
  icon: getIcon(state)
});

const reduxConnect = connect(mapStateToProps, {
  onNameChanged,
  onIconChanged,
  onSaveNameAndIconToStorage
});

export default reduxConnect(SetUpScreen);
