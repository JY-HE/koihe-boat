declare module 'vue' {
    // GlobalComponents for Volar
    export interface GlobalComponents {
        BoatButton: typeof import('@koihe/boat-ui')['BoatButton'];
    }
}

export {};
