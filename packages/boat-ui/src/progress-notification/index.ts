import { withInstall } from '../utils/withInstall';
import ProgressNotification from './src/progressNotification.vue';

export const BoatProgressNotification = withInstall(ProgressNotification);
export default BoatProgressNotification;

export * from './src/props';
