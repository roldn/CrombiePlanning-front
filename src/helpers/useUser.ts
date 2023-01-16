import { useCallback, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

const useUser = (socket: Socket) => {
  const [clientId, setClientId] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const setClientInLocalStorage = useCallback(
    (username: string, clientId: string) => {
      const clientInfo = JSON.stringify({ username, clientId });
      localStorage.setItem('client', clientInfo);
    },
    []
  );

  const getClientFromLocalStorage = useCallback(() => {
    const clientInfo = localStorage.getItem('client');

    if (clientInfo) {
      const clientInfoParsed = JSON.parse(clientInfo);

      setUsername(clientInfoParsed.username);
      setClientId(clientInfoParsed.clientId);

      socket.emit('client:client_connected', { username, clientId });
    }
  }, []);

  const changeUsername = useCallback(
    (roomId: string) => {
      socket.emit('client:add_username', { username, roomId });
    },
    [username]
  );

  useEffect(() => {
    socket.on('server:client_id', clientId => {
      setClientId(clientId);
      setClientInLocalStorage(username, clientId);
    });
  }, [username]);

  useEffect(() => {
    getClientFromLocalStorage();
  }, []);

  return {
    clientId,
    setClientId,
    username,
    setUsername,
    setClientInLocalStorage,
    changeUsername
  };
};

export default useUser;
