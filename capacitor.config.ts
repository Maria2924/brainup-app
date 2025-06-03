import type { CapacitorConfig } from '@capacitor/cli';

const isDevelopmentBuild = true;
const config: CapacitorConfig = {
  appId: 'com.greensidehub.brainup',
  appName: 'Brainup',
  webDir: 'out',
  server: isDevelopmentBuild ? {
    url: "http://172.20.10.2:3000",
    cleartext: true
  } : undefined,
  plugins: {
    "Keyboard": {
      "resize": "body",
      "resizeOnFullScreen": true
    }
  }
};

export default config;
