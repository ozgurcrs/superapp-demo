import {AppRegistry, Platform} from 'react-native';
import {ScriptManager} from '@callstack/repack/client';
import App from './App';
import {name as appName} from './app.json';

// Remote modüllerin dev-server adresleri (FAZ 6'da CDN'e taşınacak)
const REMOTE_HOSTS = {
  finans: 'http://localhost:9001',
  market: 'http://localhost:9002',
};

const CONTAINER_FILENAMES = {
  finans: 'finans.container.bundle',
  market: 'market.container.bundle',
};

// Re.Pack dev-server bundle'ları platform alt-dizininde serve eder
// (publicPath: http://host/ios/ veya /android/).
const platform = Platform.OS;

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  // 1) Remote container entry'leri (finans@dynamic / market@dynamic)
  // NOT: url düz string olmalı — Script.from fonksiyon tipini reddediyor.
  if (REMOTE_HOSTS[scriptId]) {
    return {
      url: `${REMOTE_HOSTS[scriptId]}/${platform}/${CONTAINER_FILENAMES[scriptId]}`,
      cache: false,
    };
  }

  // 2) Yüklenmiş bir remote'un kendi chunk'ları — caller remote'un host'undan çöz
  if (caller && REMOTE_HOSTS[caller]) {
    return {
      url: `${REMOTE_HOSTS[caller]}/${platform}/${scriptId}.chunk.bundle`,
      cache: false,
    };
  }

  return undefined;
});

AppRegistry.registerComponent(appName, () => App);
