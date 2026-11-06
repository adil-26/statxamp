import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.statxam.app',
  appName: 'StatXam',
  webDir: 'out',
  appendUserAgent: 'StatXamApp',
  server: {
    // Live site, so the installed app picks up UI fixes without a new APK.
    url: 'https://statxamp.vercel.app',
    androidScheme: 'https',
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
    backgroundColor: '#FBF8F3',
    captureInput: true,
  },
};

export default config;
