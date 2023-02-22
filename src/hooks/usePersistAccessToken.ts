import AsyncStorage from '@react-native-community/async-storage';
import { useEffect, useState } from 'react';

const TOKEN_ACCESS_KEY = 'react_native_chatgpt_access_token';

interface State {
  isLoaded: boolean;
  accessToken: string;
}

async function persistToken(value: string) {
  return AsyncStorage.setItem(TOKEN_ACCESS_KEY, value);
}

async function getTokenFromDisk() {
  return AsyncStorage.getItem(TOKEN_ACCESS_KEY);
}

export default function usePersistAccessToken() {
  const [state, setState] = useState<State>({
    isLoaded: false,
    accessToken: '',
  });

  useEffect(() => {
    (async () => {
      const accessToken = await getTokenFromDisk();
      setState({ isLoaded: true, accessToken: accessToken || '' });
    })();
  }, []);

  return {
    ...state,
    setAccessToken: async (value: string) => {
      await persistToken(value);
      setState({ isLoaded: true, accessToken: value });
    },
  };
}
