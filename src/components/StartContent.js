import { Pressable, Text, View } from 'react-native';
import styles from './StartContent.styles';

export default function StartContent({ carregando, onIniciar }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Quiz App</Text>

        <Text style={styles.subtitle}>
          Toque no botão abaixo para responder 10 perguntas aleatórias.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            carregando && styles.buttonDisabled,
          ]}
          onPress={onIniciar}
          disabled={carregando}
        >
          <Text style={styles.buttonText}>
            {carregando ? 'Carregando...' : 'Iniciar'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
