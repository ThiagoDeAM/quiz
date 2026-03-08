import { Pressable, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 14,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#f1f1f1',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },
  button: {
    width: '100%',
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});