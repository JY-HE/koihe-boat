import { App } from 'vue';
import BoatButton from './components/button';
import BoatDialog from './components/dialog';
import BoatInput from './components/input';

const components = [BoatButton, BoatDialog, BoatInput];
/**
 * 将组件注册到 Vue 应用中。
 * @param app Vue 应用实例。
 */
const install = (app: App) => {
    components.forEach(c => app.use(c));
};
export { BoatButton, BoatDialog, BoatInput };

export default install;
