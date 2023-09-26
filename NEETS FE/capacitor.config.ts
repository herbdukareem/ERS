import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Palliative',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    "@capacitor/camera": {
      "cameraMode": "back"
    },
    "SplashScreen": {
      "launchShowDuration": 1000,
      // other splash screen properties...
    }
  }
  
};

export default config;
