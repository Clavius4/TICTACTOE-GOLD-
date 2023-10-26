import * as React from "react";
import { useState, useEffect } from "react";
import { ToastProvider, useToast } from 'react-native-toast-message';
import { Image } from "react-native";
import { LinearGradient } from 'react-native-linear-gradient';
import { StyleSheet, Pressable, Text, View, ImageBackground, Alert, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import { checkWinOrDraw } from '../screens/GameLogic';
import TokenSelectionScreen from "../screens/TokenSelection"
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";


export default function TwoPlayer2(){

  //Setting the map array of 10 rows for Initial Game Board
  const  [map, setMap] = useState([   


    ["", "", "", "", "", "", "", "", "", ""], // 1st row
    ["", "", "", "", "", "", "", "", "", ""], // 2nd row
    ["", "", "", "", "", "", "", "", "", ""], // 3rd row
    ["", "", "", "", "", "", "", "", "", ""], // 4th row
    ["", "", "", "", "", "", "", "", "", ""], // 5th row
    ["", "", "", "", "", "", "", "", "", ""], // 6th row
    ["", "", "", "", "", "", "", "", "", ""], // 7th row
    ["", "", "", "", "", "", "", "", "", ""], // 8th row
    ["", "", "", "", "", "", "", "", "", ""], // 9th row
    ["", "", "", "", "", "", "", "", "", ""], // 10th row

  ]); 

  const [currentTurn, setCurrentTurn] = useState("X");
  const navigation = useNavigation();

  const [soundVolume, setSoundVolume] = useState(0.5);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [musicMuted, setMusicMuted] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
 
  const showAlert = (title, message, buttons) => {
    Alert.alert(
      title,
      message,
      buttons,
      { cancelable: false }
    );
  };

  // Function to handle player's move
  const handlePlayerMove = () => {
    // Debugging: Log the value of currentTurn
    console.log("Current turn before update:", currentTurn);
  
    // Toggle between "X" and "O"
    setCurrentTurn(currentTurn === "X" ? "O" : "X");
  };
  
  const announceResult = (result) => {
    let message;
    if (result === 'X' || result === 'O') {
      message = `${result} wins the game!`;
    } else if (result === 'Draw') {
      message = 'The game is a draw.';
    }

    Alert.alert(
      'Game Over',
      message,
      [
        {
          text: 'Restart',
          onPress: () => {
            resetGame();
          },
        },
        {
          text: 'Exit',
          onPress: () => {
            navigation.navigate('HomePage');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const resetGame = () => {
    // Implementing map to reset the game state.

    setMap([   


      ["", "", "", "", "", "", "", "", "", ""], // 1st row
      ["", "", "", "", "", "", "", "", "", ""], // 2nd row
      ["", "", "", "", "", "", "", "", "", ""], // 3rd row
      ["", "", "", "", "", "", "", "", "", ""], // 4th row
      ["", "", "", "", "", "", "", "", "", ""], // 5th row
      ["", "", "", "", "", "", "", "", "", ""], // 6th row
      ["", "", "", "", "", "", "", "", "", ""], // 7th row
      ["", "", "", "", "", "", "", "", "", ""], // 8th row
      ["", "", "", "", "", "", "", "", "", ""], // 9th row
      ["", "", "", "", "", "", "", "", "", ""], // 10th row
  
    ]); 
    setCurrentTurn("X");
  
  };

  const exitGame = () => {
      // Navigating back to the menu screen
    navigation.navigate("HomePage");
  };

  const onPress = (rowIndex, columnIndex) => {
    console.log("onPress called");
  
    if (map[rowIndex][columnIndex] !== "") {
      // Display a message or take appropriate action for an already occupied position
      ToastAndroid.showWithGravityAndOffset(
        'Position Occupied..!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        0,
        0
      );
      return;
    }
  
    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap;
    });
  
    setCurrentTurn(currentTurn === "X" ? "O" : "X");

    const winnerOrDraw = checkWinOrDraw(map, currentTurn);

    if (winnerOrDraw === 'X' || winnerOrDraw === 'O' || winnerOrDraw === 'Draw') {
      announceResult(winnerOrDraw);
    }

  };
  

  return (
    <ScreenWrapper>
    <View style={styles.twoplayer}>
      <View style={styles.row1}> 
      <Pressable
        style={styles.iconList}
        onPress={() => navigation.navigate("MenuDash")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/list.png")}
        />
      </Pressable>
      </View>
      <View style={[styles.row2, styles.group1]}> 
      <View style={[styles.column, styles.firstTwoColumns]}>
      <View style={styles.columnContent}>
        <Image
          style={[styles.p1Icon]}
          contentFit="contain"
          source={require("../assets/p1.png")}
        />
        </View>
        <View style={styles.columnContent}>
        <Text style={[styles.you]}></Text>
        </View>
      </View>
      <View style={[styles.column, styles.centeredColumn]}> 
      <Image
        style={[styles.vsIcon, styles.iconLayout]}
        source={currentTurn==="X"?
          require("../assets/vs1.png"): require("../assets/vs2.png")}
      />
      </View>
      <View style={[styles.column, styles.lastTwoColumns]}> 
      <View style={styles.columnContent}>
        <Image
          style={[styles.p1Icon]}
          source={require("../assets/p1.png")}
        />
        </View>
        <View style={styles.columnContent}>
        <Text style={[styles.you]}></Text>
        </View>
      </View>
        
      </View>
      <View style={[styles.row3]}> 
       <ImageBackground
       contentFit="contain"
      
      >
        <View style={styles.map}>
          {map.map((row, rowIndex)=>
          (<View style={styles.row} key={`row-${rowIndex}`}>
             {row.map((cell, columnIndex)=> 
             <Pressable onPress={()=> onPress(rowIndex, columnIndex)} 
             style={styles.cell} 
             key={`row-${columnIndex}-col-${rowIndex}`}>
              {cell==="X" && (    
                 <Image style={styles.icon2}
                   contentFit="cover"
                   source={require("../assets/x.png")}
                    />)}
          {cell==="O" && (     
          <Image
        style={styles.icon2}
        contentFit="cover"
        source={require("../assets/o.png")}
      />)}
             </Pressable>)}
          </View>
          ))}

        </View>
      </ImageBackground>
      </View>
    </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  youFlexBox: {
    textAlign: "center",
    color: Color.white,
  },
  groupLayout: {
    borderRadius: Border.br_81xl,
    height: 15,
    top: 10,
    position: "absolute",
  },
  pxfuel1Icon: {
    width: 430,
    height: 931,
    left: 0,
    top: 0,
    position: "absolute",
  },
  text: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    
    
  },
  vsIcon: {
    height: "40%",
    width: "26%",
    top: "-16%",
  },
  p1Icon: {
    height: "58.07%",
    width: "69.77%",

    
  },
  p1Parent: {
    height: "12.8%",
    width: "15.64%",
    
  },
  p2Icon: {
    height: "58.07%",
    width: "69.77%",
    
  },
  icon: {
    height: "100%",
    width: "100%",
   
  },
  icon2: {
    height: "85%",
    width: "85%",
  },
  iconList: { //MenuDash
    width: "9%",
    height: "40%",
    flexDirection: "row",
  },
  map: {
    borderColor: "gold",
    borderWidth: 3,
    width:"100%",
    aspectRatio: 0.95,
     marginTop: "1.5%",
     backgroundColor: Color.white,

  },
  groupChild: {
    height: "66%",
    width: "93.2%",
 
  },
  you: {
    fontFamily: FontFamily.archivoBlackRegular,
    fontSize: 16,
    textAlign: "center",
    color: Color.white,
    top: "-80%",

  },
  yourTurn: {
    alignSelf: 'center',
    borderRadius: 50,
    width: "85%",
    height: "10%",
    backgroundColor: "transparent",
  },
  player: {
    fontFamily: FontFamily.archivoBlackRegular,
    letterSpacing: 0.7,
    fontSize: 16,
    textAlign: "center",
    color: Color.white,
  },

  groupItem: {
    backgroundColor: Color.gray,
    width: 188,
    left: 0,
  },
  groupInner: {
    left: 133,
    width: 187,
    backgroundColor: Color.white,
  },
  rectangleParent: {
   
  },
  playersTurn: {
    fontSize: FontSize.size_base,
    fontWeight: "500",
    fontFamily: FontFamily.dMSansMedium,
    marginTop: "5%",
  },

  row4: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  row3: {
    flex: 0.47,
    justifyContent: "center",
    alignItems: "center",
  },
  row2: {
    flex: 0.23,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  row1: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start", 
    paddingRight: 10, 
    paddingTop: 28, 
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  firstTwoColumns: {
    flex: 0.3,
    marginRight: "auto",

  },
  lastTwoColumns: {
    flex: 0.3,
    marginLeft: "auto",

  },
  columnContent: {
    alignItems: "center",

  },
  centeredColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },

  buttons: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    borderRadius: 70,
    paddingHorizontal: "13%",
    bottom: -70,
  },
  button: {
    color: "white",
    margin: 10,
    fontSize: 16,
    backgroundColor: "#191F24",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  cell: {
    flex: 1,
    borderColor: "gold",
    borderWidth: 1.1,
    justifyContent: "center",
    alignItems: "center",
  },
  twoplayer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  image:{
    width:'20%',
    height:'20%',
  }
});
