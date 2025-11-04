import { router } from "expo-router";
import { Platform, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.safeArea}>
      <View style={styles.centerBlock}>
        <Text style={styles.title}>Welcome to the Stone Paper Scissors Game</Text>
        <Pressable
          onPress={() => router.push("/game")}   
          style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.primaryText}>Start</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea:{ flex:1, alignItems:"center", justifyContent:"center", backgroundColor:"white",
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) : 0 },
  centerBlock:{ alignItems:"center", justifyContent:"center", paddingVertical:16, gap:12 },
  title:{ color:"black", fontWeight:"700", textAlign:"center", marginBottom:8, fontSize:20 },
  primaryButton:{ paddingHorizontal:20, paddingVertical:12, borderRadius:10, backgroundColor:"skyblue", minWidth:140, alignItems:"center", justifyContent:"center" },
  primaryText:{ color:"white", fontWeight:"700" },
});
