import { SQLiteProvider } from 'expo-sqlite';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import { initDatabase } from './src/database/quizDb';

export default function App() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="quiz.db" onInit={initDatabase}>
        <HomeScreen />
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}