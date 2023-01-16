import { useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';

const useCreateRoom = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [allowedReveal, setAllowedReveal] = useState(false);
  const [allowedNewGame, setAllowedNewGame] = useState(false);
  const [gameName, setGameName] = useState<string>('');

  const createRoom = useCallback(
    (socket: Socket, username: string, gameName: string, clientId?: string) => {
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

  return {
    gameStarted,
    allowedReveal,
    allowedNewGame,
    setGameStarted,
    createRoom,
    gameName,
    setGameName
  };
};

export default useCreateRoom;
