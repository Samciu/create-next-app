const webpack = require('webpack');

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
    require.extensions['.css'] = (file) => { }
}

const webpackConfig = (config, { isServer, buildId, defaultLoaders }) => {

    config.module.rules.push({
        test: /\.(scss|css)$/,
        use: [
            defaultLoaders.babel,
            {
                loader: require('styled-jsx/webpack').loader,
                options: {
                    type: 'scoped'
                }
            },
            "postcss-loader",
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true
                }
            }
        ]
    });

    config.module.rules.push({
        test: /\.(jpg|png|svg|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8000,
                    outputPath: 'static/assets',
                    publicPath: '/_next/static/assets',
                    name: '[path][name].[hash].[ext]'
                }
            }
        ]
    });

    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.SENTRY_RELEASE': JSON.stringify(buildId)
        })
    );

    if (!isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    return config;
}

module.exports = {
    webpack: webpackConfig
};