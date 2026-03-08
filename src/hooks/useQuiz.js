import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { buscarTodasPerguntas } from '../database/quizDb';

function embaralhar(lista) {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

export default function useQuiz(db) {
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [perguntas, setPerguntas] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [carregando, setCarregando] = useState(false);

  const ultimaPerguntaExibidaRef = useRef(null);

  const perguntaAtual = perguntas[indiceAtual] ?? null;
  const totalPerguntas = perguntas.length;

  async function iniciarJogo() {
    try {
      setCarregando(true);

      const todas = await buscarTodasPerguntas(db);
      const sorteadas = embaralhar(todas).slice(0, 10);

      setPerguntas(sorteadas);
      setIndiceAtual(0);
      setAcertos(0);
      setJogoIniciado(true);
      ultimaPerguntaExibidaRef.current = null;
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível iniciar o jogo.');
    } finally {
      setCarregando(false);
    }
  }

  function reiniciarJogo() {
    setJogoIniciado(false);
    setPerguntas([]);
    setIndiceAtual(0);
    setAcertos(0);
    ultimaPerguntaExibidaRef.current = null;
  }

  function responder(opcaoEscolhida) {
    const acertou = perguntaAtual?.correta === opcaoEscolhida;
    const novosAcertos = acertou ? acertos + 1 : acertos;
    const ehUltima = indiceAtual >= totalPerguntas - 1;

    if (acertou) {
      setAcertos(novosAcertos);
    }

    if (ehUltima) {
      setTimeout(() => {
        Alert.alert(
          'Fim',
          `Você acertou ${novosAcertos} de ${totalPerguntas}.`,
          [
            {
              text: 'Reiniciar',
              onPress: reiniciarJogo,
            },
          ],
          { cancelable: false }
        );
      }, 100);

      return;
    }

    setIndiceAtual((valorAtual) => valorAtual + 1);
  }

  useEffect(() => {
    if (!jogoIniciado || !perguntaAtual) {
      return;
    }

    if (ultimaPerguntaExibidaRef.current === perguntaAtual.id) {
      return;
    }

    ultimaPerguntaExibidaRef.current = perguntaAtual.id;

    setTimeout(() => {
      Alert.alert(
        `Pergunta ${indiceAtual + 1}`,
        perguntaAtual.pergunta,
        [
          {
            text: perguntaAtual.resposta1,
            onPress: () => responder(1),
          },
          {
            text: perguntaAtual.resposta2,
            onPress: () => responder(2),
          },
        ],
        { cancelable: false }
      );
    }, 100);
  }, [jogoIniciado, perguntaAtual, indiceAtual]);

  return {
    carregando,
    iniciarJogo,
  };
}