import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import { Platform, Pressable, StatusBar, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const useFont = () => {
  const { width } = useWindowDimensions();
  const scale = Math.min(Math.max(width / 375, 0.85), 1.2);
  return (size: number) => Math.round(size * scale);
};

export default function GameScreen() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [computerSelection, setComputerSelection] = useState("");
  const [playerSelection, setPlayerSelection] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [confetti, setConfetti] = useState(false);
  const f = useFont();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (computerScore === 5 || playerScore === 5) {
      setWinner(computerScore === 5 ? "Computer" : "Player");
      setGameOver(true);
      setConfetti(true);
    }
  }, [computerScore, playerScore]);

  const handleRestart = () => {
    setComputerScore(0);
    setPlayerScore(0);
    setGameOver(false);
    setPlayerSelection("");
    setComputerSelection("");
    setWinner("");
    setConfetti(false);
  };

  const pick = (player: "Rock" | "Paper" | "Scissors") => {
    setPlayerSelection(player);
    const r = Math.floor(Math.random() * 3) + 1;
    const comp = r === 1 ? "Rock" : r === 2 ? "Paper" : "Scissors";
    setComputerSelection(comp);

    if (player === "Rock" && comp === "Paper") setComputerScore(s => s + 1);
    if (player === "Rock" && comp === "Scissors") setPlayerScore(s => s + 1);
    if (player === "Paper" && comp === "Rock") setPlayerScore(s => s + 1);
    if (player === "Paper" && comp === "Scissors") setComputerScore(s => s + 1);
    if (player === "Scissors" && comp === "Rock") setComputerScore(s => s + 1);
    if (player === "Scissors" && comp === "Paper") setPlayerScore(s => s + 1);
  };

  const styles = StyleSheet.create({
    safeArea: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white", paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) : 0 },
    container: { width: "100%", maxWidth: 600, paddingHorizontal: 12 },
    contentGap: { gap: 16 },
    controlsWrap: { flexDirection: "row", flexWrap: "wrap", columnGap: 10, rowGap: 10, justifyContent: "center" },
    choiceButton: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, backgroundColor: "#b7ddf0" },
    choiceText: { color: "black", fontWeight: "600" },
    card: { borderRadius: 12, backgroundColor: "#f6fbff", padding: 12, gap: 6 },
    rowText: { color: "black" },
    bold: { fontWeight: "800" },
    scoresRow: { flexDirection: "row", gap: 12, justifyContent: "space-between" },
    scoreBox: { flex: 1, borderRadius: 12, backgroundColor: "#eef7fd", paddingVertical: 12, alignItems: "center", justifyContent: "center" },
    scoreLabel: { color: "#333", fontWeight: "600", marginBottom: 4 },
    scoreValue: { color: "black", fontWeight: "800" },
    centerBlock: { alignItems: "center", justifyContent: "center", paddingVertical: 16, gap: 12 },
    primaryButton: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, backgroundColor: "skyblue", minWidth: 140, alignItems: "center", justifyContent: "center" },
    primaryText: { color: "white", fontWeight: "700" },
    winText: { color: "black", fontWeight: "800", textAlign: "center" },
  });

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.contentGap}>
          <View style={styles.controlsWrap}>
            <Pressable style={({ pressed }) => [styles.choiceButton, pressed && { opacity: 0.8 }]} disabled={gameOver} onPress={() => pick("Rock")}>
              <Text style={[styles.choiceText, { fontSize: f(16) }]}><FontAwesome5 name="hand-rock" size={18} color="black" /> Rock</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.choiceButton, pressed && { opacity: 0.8 }]} disabled={gameOver} onPress={() => pick("Paper")}>
              <Text style={[styles.choiceText, { fontSize: f(16) }]}><FontAwesome5 name="hand-paper" size={18} color="black" /> Paper</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.choiceButton, pressed && { opacity: 0.8 }]} disabled={gameOver} onPress={() => pick("Scissors")}>
              <Text style={[styles.choiceText, { fontSize: f(16) }]}><FontAwesome5 name="hand-scissors" size={18} color="black" /> Scissors</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={[styles.rowText, { fontSize: f(18) }]}>
              Player selection: <Text style={styles.bold}>{playerSelection || "-"}</Text>
            </Text>
            <Text style={[styles.rowText, { fontSize: f(18) }]}>
              Computer selection: <Text style={styles.bold}>{computerSelection || "-"}</Text>
            </Text>
          </View>

          <View style={styles.scoresRow}>
            <View style={styles.scoreBox}>
              <Text style={[styles.scoreLabel, { fontSize: f(14) }]}>Your Score</Text>
              <Text style={[styles.scoreValue, { fontSize: f(28) }]}>{playerScore}</Text>
            </View>
            <View style={styles.scoreBox}>
              <Text style={[styles.scoreLabel, { fontSize: f(14) }]}>Computer Score</Text>
              <Text style={[styles.scoreValue, { fontSize: f(28) }]}>{computerScore}</Text>
            </View>
          </View>

          {!gameOver ? (
            <View style={styles.centerBlock}>
              <Pressable style={styles.primaryButton} onPress={handleRestart}>
                <Text style={[styles.primaryText, { fontSize: f(18) }]}>Reset</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.centerBlock}>
              <Text style={[styles.winText, { fontSize: f(20) }]}>{winner} Wins <MaterialIcons name="celebration" size={24} color="black" /></Text>
              <Pressable style={styles.primaryButton} onPress={handleRestart}>
                <Text style={[styles.primaryText, { fontSize: f(18) }]}>Restart</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {confetti && winner === "Player" && (
        <ConfettiCannon count={180} origin={{ x: width / 2, y: -20 }} fadeOut explosionSpeed={450} fallSpeed={3000}
          colors={["#ff3b30", "#ffcc00", "#34c759", "#5856d6", "#5ac8fa"]}
          onAnimationEnd={() => setConfetti(false)}
        />
      )}
      {confetti && winner === "Computer" && (
        <ConfettiCannon count={180} origin={{ x: width / 2, y: -20 }} fadeOut explosionSpeed={450} fallSpeed={3000}
          colors={["#A0AEC0", "#718096", "#CBD5E0", "#90CDF4", "#63B3ED"]}
          onAnimationEnd={() => setConfetti(false)}
        />
      )}
    </View>
  );
}
