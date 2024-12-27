declare module '@vue/runtime-core' {
    // GlobalComponents for Volar
    export interface GlobalComponents {
        BoatButton: typeof import('@koihe/boat-ui')['BoatButton'];
        BoatProgressNotification: typeof import('@koihe/boat-ui')['BoatProgressNotification'];
    }
}

export {};
