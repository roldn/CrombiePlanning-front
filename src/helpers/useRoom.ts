import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { User } from '../types/User';
import useCards from './useCards';
import useUser from './useUser';

const useCreateRoom = (socket: Socket) => {
  const [roomId, setRoomId] = useState<string>('');
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [allowedReveal, setAllowedReveal] = useState(false);
  const [allowedNewGame, setAllowedNewGame] = useState(false);
  const [gameName, setGameName] = useState<string>('');
  const [users, setUsers] = useState<User[]>();
  const [average, setAverage] = useState<number | undefined>();
  const { roomParamId } = useParams();

  const user = useUser(socket);
  const cards = useCards(socket);

  const createRoom = useCallback(
    (username: string, gameName: string, clientId: string) => {
      if (clientId) {
        socket.emit('client:create_room', { username, gameName, clientId });
      } else {
        socket.emit('client:create_room', { username, gameName });
      }
      setGameStarted(true);
      setAllowedReveal(true);
      setAllowedNewGame(true);
    },
    []
  );

  const joinRoom = useCallback(
    (roomId: string, username: string, clientId: string) => {
      if (clientId) {
        socket.emit('client:join_room', { roomId, username, clientId });
      } else {
        socket.emit('client:join_room', { roomId, username });
      }
    },
    []
  );

  useEffect(() => {
    if (roomParamId) {
      setRoomId(roomParamId);
      joinRoom(roomId, user.username || '', user.clientId);
    }
  }, [roomId]);

  useEffect(() => {
    socket.on('server:new_room', ({ roomId, users }) => {
      setRoomId(roomId);
      setUsers(users);
      window.history.replaceState(null, `Game ${gameName}`, `${roomId}`);
    });

    socket.on(
      'server:user_joined',
      ({ roomUsers, reveal, gameName, coffeeTime, cardsVotes, average }) => {
        setUsers(roomUsers);
        cards.setReveal(reveal);
        setGameName(gameName);
        setGameStarted(true);
        cards.setCoffee(coffeeTime);
        cards.setCardsVotes(cardsVotes);
        setAverage(average);
      }
    );

    socket.on('server:users', ({ roomVoting, reveal }) => {
      setUsers(roomVoting);
      cards.setReveal(reveal);
    });

    socket.on('server:reveal_cards', ({ averageVoting, cardsVotes }) => {
      cards.setCardsVotes(cardsVotes);
      setAverage(averageVoting);
      cards.setReveal(true);
    });

    socket.on('server:start_new_voting', ({ roomUsers }) => {
      cards.setReveal(false);
      setUsers(roomUsers);
      setAverage(undefined);
      cards.setCardsVotes([]);
      cards.setCoffee(false);
      cards.setCanReveal(false);
      cards.fiboCards.forEach(fibo => (fibo.checked = false));
    });
  }, []);

  return {
    room: {
      roomId,
      createRoom,
      cards: cards.cardsVotes,
      fiboCards: cards.fiboCards,
      setGameName,
      gameStarted,
      reveal: cards.reveal,
      gameName,
      users,
      average,
      coffee: cards.coffee
    },
    user: {
      username: user.username,
      clientId: user.clientId,
      setUsername: user.setUsername,
      changeUsername: user.changeUsername,
      canReveal: cards.canReveal,
      handleCardSelect: cards.handleCardSelect,
      allowedReveal,
      allowedNewGame,
      startNewVoting: cards.startNewVoting,
      revealCards: cards.revealCards
    }
  };
};

export default useCreateRoom;
