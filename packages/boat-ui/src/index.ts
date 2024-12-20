// import type { App } from 'vue';
// import BoatButton from './button';
// import BoatDialog from './dialog';
// import BoatInput from './input';

// const components = [BoatButton, BoatDialog, BoatInput];
// /**
//  * 将组件注册到 Vue 应用中。
//  * @param app Vue 应用实例。
//  */
// const install = (app: App) => {
//     components.forEach(c => app.use(c));
// };

// export { BoatButton, BoatDialog, BoatInput };

// export default install;

import type { App } from 'vue';
import { BoatButton } from './button';

export * from './button';

const components = [BoatButton];

export function install(app: App) {
    components.forEach(item => {
        if (item.install!) {
            app.use(item);
        } else if (item.name) {
            app.component(item.name, item);
        }
    });
}

export default {
    install,
};
