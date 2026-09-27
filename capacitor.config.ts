import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.statxam.app',
  appName: 'StatXam',
  webDir: 'out',
  server: {
    // Points to live Vercel app so any update is immediately reflected in the APK
    url: 'https://statxamp.vercel.app',
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#FBF8F3',
  },
};

export default config;
