import { useCallback, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { CardVotes } from '../types/CardVotes';
import { FiboCards } from '../types/FiboCards';

const fiboCardsArray: FiboCards[] = [
  { card: '0', checked: false },
  { card: '1', checked: false },
  { card: '2', checked: false },
  { card: '3', checked: false },
  { card: '5', checked: false },
  { card: '8', checked: false },
  { card: '13', checked: false },
  { card: '21', checked: false },
  { card: '34', checked: false },
  { card: '55', checked: false },
  { card: '89', checked: false },
  { card: '?', checked: false },
  { card: '☕', checked: false }
];

const useCards = (socket: Socket) => {
  const [revealing, setRevealing] = useState<boolean>(false);
  const [canReveal, setCanReveal] = useState(false);
  const [cardsVotes, setCardsVotes] = useState<CardVotes[]>();
  const [coffee, setCoffee] = useState<boolean>(false);
  const [fiboCards, setFiboCards] = useState<FiboCards[]>(fiboCardsArray);

  const revealCards = useCallback((roomId: string) => {
    socket.emit('client:reveal_cards', roomId);
  }, []);

  const handleCardSelect = useCallback(
    (card: string, roomId: string, clientId: string) => {
      if (!roomId) {
        return;
      }

      const cardIndex = fiboCards.findIndex(fibo => fibo.card === card);

      if (cardIndex === -1) {
        return;
      }

      if (fiboCards[cardIndex].checked) {
        setCanReveal(false);
        socket.emit('client:card_select', { card: '', roomId, clientId });
        fiboCards[cardIndex].checked = false;
      } else {
        fiboCards.forEach(fibo => (fibo.checked = false));
        setCanReveal(true);
        socket.emit('client:card_select', { card, roomId, clientId });
        fiboCards[cardIndex].checked = true;
      }
    },
    []
  );

  const startNewVoting = useCallback((roomId: string) => {
    socket.emit('client:start_new_voting', roomId);
    setRevealing(false);
    setCardsVotes([]);
    setCoffee(false);
  }, []);

  useEffect(() => {
    socket.on('server:coffee', () => {
      setCoffee(true);
    });
  }, []);

  useEffect(() => {
    socket.on('server:selected_card', card => {
      const cardIndex = fiboCards.findIndex(fibo => fibo.card === card);

      if (cardIndex === -1) {
        return;
      }

      const cardsArray = fiboCards.slice();

      cardsArray[cardIndex].checked = true;

      setFiboCards(cardsArray);
    });
  }, []);

  return {
    revealing: revealing,
    setRevealing,
    revealCards,
    handleCardSelect,
    canReveal,
    setCanReveal,
    fiboCards,
    coffee,
    setCoffee,
    cardsVotes,
    setCardsVotes,
    startNewVoting
  };
};

export default useCards;
