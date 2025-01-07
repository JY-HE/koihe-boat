import { withInstallFunction } from '../utils/install';
import Notify from './src/notify';

export const BoatNotification = withInstallFunction(Notify, '$notify');

export default BoatNotification;
export * from './src/props';
