export default (callback: (arg: any) => Promise<any>, wait: number) => {
    let timeout: any;

    return async (...args: [unknown]): Promise<void> => {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            void callback.apply(context, args);
        }, wait);

        return Promise.resolve();
    };
};
