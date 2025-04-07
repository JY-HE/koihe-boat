declare module '@vue/runtime-core' {
    // GlobalComponents for Volar
    export interface GlobalComponents {
        BoatButton: typeof import('@koihe/boat-ui')['BoatButton'];
        BoatIcon: typeof import('@koihe/boat-ui')['BoatIcon'];
        BoatNotification: typeof import('@koihe/boat-ui')['BoatNotification'];
        BoatProgressNotification: typeof import('@koihe/boat-ui')['BoatProgressNotification'];
        BoatRotateMenu: typeof import('@koihe/boat-ui')['BoatRotateMenu'];
    }
}

export {};
