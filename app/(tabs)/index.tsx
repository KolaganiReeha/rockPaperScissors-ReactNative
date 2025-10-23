import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useMemo, useState } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, View, useWindowDimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const useFont = () => {
  const { width } = useWindowDimensions();
  const scale = Math.min(Math.max(width / 375, 0.85), 1.2);
  return (size: number) => Math.round(size * scale);
};

export default function HomeScreen(){
  const [gameDisplay, setGameDisplay] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [computerSelection, setComputerSelection] = useState("");
  const [playerSelection, setPlayerSelection] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [confetti, setConfetti] = useState(false);
  const f = useFont();
  const { width } = useWindowDimensions();

  useEffect(()=>{
    if(computerScore === 5 || playerScore === 5){
      if(computerScore === 5){
        setWinner("Computer");
        setGameOver(true);
        setConfetti(true);
      }else{
        setWinner("Player");
        setGameOver(true);
        setConfetti(true);
      }
    }
  },[computerScore, playerScore]);

  const handleRestart = () => {
    setComputerScore(0);
    setPlayerScore(0);
    setGameOver(false);
    setPlayerSelection("");
    setComputerSelection("");
    setWinner("");
    setConfetti(false);
  }

  const handlePlayerRockClick = () =>{
    setPlayerSelection("Rock")
     const randomNumber = Math.floor(Math.random()*3) + 1;
     switch(randomNumber){
      case 1: setComputerSelection("Rock");
              break;
      case 2: setComputerSelection("Paper");
              break;
      case 3: setComputerSelection("Scissors");
              break;
     }
     if(randomNumber === 2) setComputerScore((prevScore)=>prevScore + 1);
     if(randomNumber === 3) setPlayerScore((prevScore)=>prevScore + 1);
  }

  const handlePlayerPaperClick = () =>{
    setPlayerSelection("Paper")
     const randomNumber = Math.floor(Math.random()*3) + 1;
     switch(randomNumber){
      case 1: setComputerSelection("Rock");
              break;
      case 2: setComputerSelection("Paper");
              break;
      case 3: setComputerSelection("Scissors");
              break;
     }
     if(randomNumber === 1) setPlayerScore((prevScore)=>prevScore + 1);
     if(randomNumber === 3) setComputerScore((prevScore)=>prevScore + 1);
  }
  
  const handlePlayerScissorsClick = () =>{
    setPlayerSelection("Scissors")
     const randomNumber = Math.floor(Math.random()*3) + 1;
     switch(randomNumber){
      case 1: setComputerSelection("Rock");
              break;
      case 2: setComputerSelection("Paper");
              break;
      case 3: setComputerSelection("Scissors");
              break;
     }
     if(randomNumber === 1) setComputerScore((prevScore)=>prevScore + 1);
     if(randomNumber === 2) setPlayerScore((prevScore)=>prevScore + 1);
  }

    const maxContentWidth = useMemo(() => Math.min(width - 24, 600), [width]);

  return(
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { maxWidth: maxContentWidth }]}>
        {!gameDisplay ? (
          <View style={styles.centerBlock}>
            <Text style={[styles.title, { fontSize: f(22) }]}>
              Welcome to the Stone Paper Scissors Game
            </Text>
            <TouchableHighlight
              style={styles.primaryButton}
              activeOpacity={0.7}
              underlayColor="#5db6d6"
              onPress={() => setGameDisplay(true)}
            >
              <Text style={[styles.primaryText, { fontSize: f(18) }]}>
                Start
              </Text>
            </TouchableHighlight>
          </View>
        ) : (
          <View style={styles.contentGap}>
            <View style={styles.controlsWrap}>
              <TouchableHighlight
                style={styles.choiceButton}
                disabled={gameOver}
                underlayColor="#95d1e8"
                onPress={handlePlayerRockClick}
              >
                <Text style={[styles.choiceText, { fontSize: f(16) }]}>
                  <FontAwesome5 name="hand-rock" size={18} color="black" /> Rock
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.choiceButton}
                disabled={gameOver}
                underlayColor="#95d1e8"
                onPress={handlePlayerPaperClick}
              >
                <Text style={[styles.choiceText, { fontSize: f(16) }]}>
                  <FontAwesome5 name="hand-paper" size={18} color="black" />{" "}
                  Paper
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.choiceButton}
                disabled={gameOver}
                underlayColor="#95d1e8"
                onPress={handlePlayerScissorsClick}
              >
                <Text style={[styles.choiceText, { fontSize: f(16) }]}>
                  <FontAwesome5 name="hand-scissors" size={18} color="black" />{" "}
                  Scissors
                </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.card}>
              <Text style={[styles.rowText, { fontSize: f(18) }]}>
                Player selection: <Text style={styles.bold}>{playerSelection || "-"}</Text>
              </Text>
              <Text style={[styles.rowText, { fontSize: f(18) }]}>
                Computer selection:{" "}
                <Text style={styles.bold}>{computerSelection || "-"}</Text>
              </Text>
            </View>

            <View style={styles.scoresRow}>
              <View style={styles.scoreBox}>
                <Text style={[styles.scoreLabel, { fontSize: f(14) }]}>
                  Your Score
                </Text>
                <Text style={[styles.scoreValue, { fontSize: f(28) }]}>
                  {playerScore}
                </Text>
              </View>
              <View style={styles.scoreBox}>
                <Text style={[styles.scoreLabel, { fontSize: f(14) }]}>
                  Computer Score
                </Text>
                <Text style={[styles.scoreValue, { fontSize: f(28) }]}>
                  {computerScore}
                </Text>
              </View>
            </View>

            {!gameOver ? (
              <View style={styles.centerBlock}>
                <TouchableHighlight
                  style={styles.primaryButton}
                  underlayColor="#5db6d6"
                  onPress={handleRestart}
                >
                  <Text style={[styles.primaryText, { fontSize: f(18) }]}>
                    Reset
                  </Text>
                </TouchableHighlight>
              </View>
            ) : (
              <View style={styles.centerBlock}>
                <Text style={[styles.winText, { fontSize: f(20) }]}>
                  {winner} Wins <MaterialIcons name="celebration" size={24} color="black" />
                </Text>
                <TouchableHighlight
                  style={styles.primaryButton}
                  underlayColor="#5db6d6"
                  onPress={handleRestart}
                >
                  <Text style={[styles.primaryText, { fontSize: f(18) }]}>
                    Restart
                  </Text>
                </TouchableHighlight>
              </View>
            )}
          </View>
        )}
      </View>
      {confetti && winner==="Player" && (
        <ConfettiCannon
          count={180}                          
          origin={{ x: width / 2, y: -20 }}    
          fadeOut                              
          explosionSpeed={450}                 
          fallSpeed={3000}                     
          colors={["#ff3b30","#ffcc00","#34c759","#5856d6","#5ac8fa"]}
          onAnimationEnd={()=>setConfetti(false)}
        />
      )}
      {confetti && winner==="Computer" && (
        <ConfettiCannon
          count={180}                          
          origin={{ x: width / 2, y: -20 }}    
          fadeOut                              
          explosionSpeed={450}                 
          fallSpeed={3000}                     
          colors={["#A0AEC0", "#718096", "#CBD5E0", "#90CDF4", "#63B3ED"]
}
          onAnimationEnd={()=>setConfetti(false)}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) : 0,
  },
  container: {
    flex: 1,
    alignSelf: "center",
    alignItems:"center",
    justifyContent:"center",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  contentGap: {
    gap: 16,
  },
  centerBlock: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 12,
  },
  title: {
    color: "black",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  primaryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "skyblue",
    minWidth: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "white",
    fontWeight: "700",
  },

  controlsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 10,
    rowGap: 10,
    justifyContent: "center",
  },
  choiceButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#b7ddf0",
  },
  choiceText: {
    color: "black",
    fontWeight: "600",
  },

  card: {
    borderRadius: 12,
    backgroundColor: "#f6fbff",
    padding: 12,
    gap: 6,
  },
  rowText: {
    color: "black",
  },
  bold: {
    fontWeight: "800",
  },

  scoresRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  scoreBox: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#eef7fd",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreLabel: {
    color: "#333",
    fontWeight: "600",
    marginBottom: 4,
  },
  scoreValue: {
    color: "black",
    fontWeight: "800",
  },

  winText: {
    color: "black",
    fontWeight: "800",
    textAlign: "center",
  },
})