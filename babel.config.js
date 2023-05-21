module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@bumble/gpb': './node_modules/@bumble/gpb/dist',
                        '@bumble/proto': './proto',
                        '@components': './components',
                        '@screens': './screens',
                        '@appTypes': './types',
                        '@utils': './utils',
                        '@hooks': './hooks',
                        '@constants': './constants',
                        '@models': './models',
                        '@data': './data',
                    },
                },
            ],
        ],
    };
};
