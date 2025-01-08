import { withInstall } from '../utils/install';
import ProgressNotification from './src/progressNotification.vue';

export const BoatProgressNotification = withInstall(ProgressNotification);
export default BoatProgressNotification;

export * from './src/props';
