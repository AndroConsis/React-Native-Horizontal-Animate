/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  Image
} from "react-native";

const quotesArray = [
  ["Stay Hungry. Stay Foolish.", "Steve Jobs"],
  ["Good Artists Copy, Great Artists Steal.", "Pablo Picasso"],
  ["Argue with idiots, and you become an idiot.", "Paul Graham"],
  ["Be yourself; everyone else is already taken.", "Oscar Wilde"],
  ["Simplicity is the ultimate sophistication.", "Leonardo Da Vinci"]
];

const { width, height } = Dimensions.get("window");
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: quotesArray,
      currentShowingIndex: 0, 
      translateX: new Animated.Value(0)
    };
    this.animateCard = this.animateCard.bind(this);
  }
  
  animateCard = direction => {
    let{ currentShowingIndex, data} = this.state;
    if (direction == 'left') {
      if (currentShowingIndex == (data.length - 1)) return;
      if (currentShowingIndex >= 0) currentShowingIndex++;
      this.setState({ currentShowingIndex })
    } else {
      if (currentShowingIndex == 0) return;
      if (currentShowingIndex <= data.length) currentShowingIndex--;
      this.setState({currentShowingIndex});
    }

    Animated.timing(this.state.translateX, {
      toValue: -width * currentShowingIndex,
      useNativeDriver: true,
      duration: 700,
      easing: Easing.elastic()
    }).start();
  };

  render() {
    const { translateX } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={styles.backgroundView}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "#e8e8e8",
            width: 700,
            transform: [{ rotate: "165deg" }, { translateX: 100 }]
          }}
        />
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "transparent"
          }}
        >
          <View
            style={{
              flex: 8,
              flexDirection: "row",
              width: width * this.state.data.length,
              marginTop: 20
            }}
          >
            {this.state.data.map(item => {
              return <Animated.View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 5,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                marginHorizontal: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 40,
                transform: [
                  {
                    translateX: translateX
                  }
                ]
              }}
            ><Text style={styles.quoteText}>{item[0]}</Text>
            <Text style={styles.quoteAuthorText}>- {item[1]}</Text></Animated.View>
            })}
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              backgroundColor: "transparent",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPressIn={() => this.animateCard("right")}
            >
              <View
                style={styles.buttonInnerView}
              >
                <Text
                  style={{
                    flex: 1,
                    alignItems: "center",
                    textAlign: "center",
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold"
                  }}
                >
                  LEFT
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPressIn={() => this.animateCard("left")}
            >
              <View
                style={styles.buttonInnerView}
              >
                <Text
                  style={{
                    flex: 1,
                    alignItems: "center",
                    textAlign: "center",
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold"
                  }}
                >
                  RIGHT
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF"
  },
  quoteText: {
    fontFamily: 'GillSans-Light',
    fontSize: 24,
    padding: 20,
    color: '#212121'
  },
  quoteAuthorText: {
    fontSize: 16,
    padding: 20,
    fontFamily: 'GillSans-SemiBold',
    color: 'gray' 
  },
  button: {
    height: 64,
    width: width / 2 - 55,
    margin: 15
  },
  buttonInnerView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(209, 122, 173, .4)"
  },
  backgroundView: {
    flex: 1,
    backgroundColor: "#fcfdf0",
    width: 700,
    transform: [{ rotate: "165deg" }, { translateX: 100 }]
  }
});
