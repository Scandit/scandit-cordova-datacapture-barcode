export interface BlockingModeListenerResult {
    enabled: boolean;
}
export declare const Cordova: {
    pluginName: string;
    defaults: {};
    exec: (success: Function | null, error: Function | null, functionName: string, args: [
        any
    ] | null) => void;
};
export declare function initializeBarcodeCordova(): void;
