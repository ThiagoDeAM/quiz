import { ImageBackground, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSQLiteContext } from 'expo-sqlite';
import StartContent from '../components/StartContent';
import useQuiz from '../hooks/useQuiz';

export default function HomeScreen() {
  const db = useSQLiteContext();
  const insets = useSafeAreaInsets();

  const { carregando, iniciarJogo } = useQuiz(db);

  return (
    <ImageBackground
      source={require('../../assets/quiz.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View
        style={[
          styles.overlay,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <StartContent carregando={carregando} onIniciar={iniciarJogo} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
});