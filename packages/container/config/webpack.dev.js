const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:9090/'
    },
    devServer: {
        port: 9090,
        historyApiFallback: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                'auth': 'auth@http://localhost:9092/remoteEntry.js',
                'marketing': 'marketing@http://localhost:9091/remoteEntry.js',
                'dashboard': 'dashboard@http://localhost:9093/remoteEntry.js',
            },
            shared: packageJson.dependencies
        }),
    ]
}

module.exports = merge(commonConfig, devConfig);