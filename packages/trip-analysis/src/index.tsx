import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-drivekit-trip-analysis' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const DrivekitTripAnalysisModule = isTurboModuleEnabled
  ? require('./NativeDrivekitTripAnalysis').default
  : NativeModules.RNDriveKitTripAnalysis;

const DrivekitTripAnalysis = DrivekitTripAnalysisModule
  ? DrivekitTripAnalysisModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function activateAutoStart(enable: boolean): void {
  return DrivekitTripAnalysis.activateAutoStart(enable);
}

export function activateCrashDetection(enable: boolean): void {
  return DrivekitTripAnalysis.activateCrashDetection(enable);
}

export function startTrip(): void {
  return DrivekitTripAnalysis.startTrip();
}

export function stopTrip(): void {
  return DrivekitTripAnalysis.stopTrip();
}

export function enableMonitorPotentialTripStart(enable: boolean): void {
  return DrivekitTripAnalysis.enableMonitorPotentialTripStart(enable);
}

export enum CancelTripReason {
  USER = 'USER',
  HIGH_SPEED = 'HIGH_SPEED',
  NO_SPEED = 'NO_SPEED',
  NO_BEACON = 'NO_BEACON',
  MISSING_CONFIGURATION = 'MISSING_CONFIGURATION',
  NO_GPS_DATA = 'NO_GPS_DATA',
  RESET = 'RESET',
  BEACON_NO_SPEED = 'BEACON_NO_SPEED',
  NO_BLUETOOTH_DEVICE = 'NO_BLUETOOTH_DEVICE',
}

export enum StartMode {
  GPS = 'GPS',
  BEACON = 'BEACON',
  MANUAL = 'MANUAL',
  GEOZONE = 'GEOZONE',
  BLUETOOTH = 'BLUETOOTH',
  BLUETOOTH_UNKNOWN = 'BLUETOOTH_UNKNOWN',
  BICYCLE_ACTIVITY = 'BICYCLE_ACTIVITY',
}

export type TripPoint = {
  latitude: number;
  longitude: number;
  speed: number;
  accuracy: number;
  elevation: number;
  distance: number;
  heading: number;
  duration: number;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export enum SDKState {
  INACTIVE = 'INACTIVE',
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  STOPPING = 'STOPPING',
  SENDING = 'SENDING',
}

export enum CrashStatus {
  CONFIRMED = 'CONFIRMED',
  UNCONFIRMED = 'UNCONFIRMED',
}

export type CrashInfo = {
  crashId: string;
  timestamp: number;
  probability: number;
  latitude: number;
  longitude: number;
  velocity: number;
  crashStatus: CrashStatus;
};

export enum CrashFeedbackType {
  NO_CRASH = 'NO_CRASH',
  CONFIRMED = 'CONFIRMED',
  NO_FEEDBACK = 'NO_FEEDBACK',
}

export enum CrashFeedbackSeverity {
  CRITICAL = 'CRITICAL',
  MINOR = 'MINOR',
  NONE = 'NONE',
}

export type CrashFeedback = {
  crashInfo: CrashInfo;
  feedbackType: CrashFeedbackType;
  severity: CrashFeedbackSeverity;
};

type Listeners = {
  tripStarted: (startMode: StartMode) => void;
  tripPoint: (tripPoint: TripPoint) => void;
  tripCancelled: (reason: CancelTripReason) => void;
  tripFinished: (data: { response: any; post: any }) => void;
  potentialTripStart: (startMode: StartMode) => void;
  tripSavedForRepost: () => void;
  beaconDetected: () => void;
  significantLocationChangeDetected: (location: Location) => void;
  sdkStateChanged: (state: SDKState) => void;
  crashDetected: (crashInfo: CrashInfo) => void;
  crashFeedbackSent: (crashFeedback: CrashFeedback) => void;
};

const eventEmitter = new NativeEventEmitter(DrivekitTripAnalysis);

export function addEventListener<E extends keyof Listeners>(
  event: E,
  callback: Listeners[E]
): EmitterSubscription {
  return eventEmitter.addListener(event, callback);
}
