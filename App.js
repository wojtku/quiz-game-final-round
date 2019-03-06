import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Audio } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.audioPlayer = new Audio.Sound();
    this.resetState = this.resetState.bind(this);
    this.state = {
      buttonDisabled: false,
      buttonColor: {
        backgroundColor: "white"
      }
    };
  }

  playSound = async () => {
    try {
      await this.audioPlayer.unloadAsync();
      await this.audioPlayer.loadAsync(require("./assets/buzz.mp3"));
      await this.audioPlayer.playAsync();
    } catch (err) {
      //console.warn("Couldn't Play audio", err);
    }
  };

  resetState = () => {
    this.setState({
      buttonDisabled: false,
      buttonColor: {
        backgroundColor: "white"
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          pointerEvents={this.state.buttonDisabled ? "none" : undefined}
          style={[styles.buttonContainer, this.state.buttonColor]}
          onTouchStart={() => {
            this.setState(
              {
                buttonColor: {
                  backgroundColor: "green"
                },
                buttonDisabled: true
              },
              () => {
                this.playSound();
                setTimeout(
                  function() {
                    this.resetState();
                  }.bind(this),
                  2000
                );
              }
            );
          }}
        >
          <Text style={styles.textContainer}>
            {this.state.buttonColor.backgroundColor === "white" ? "STOP" : ""}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    fontSize: 40,
    textAlign: "center",
    textAlignVertical: "center"
  }
});
