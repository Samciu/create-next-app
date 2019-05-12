const prod = process.env.NODE_ENV === 'production';

module.exports = {
    'process.env.FETCH_URL': prod
        ? '//api.erc.com'
        : '//0.0.0.0/api',
    'process.env.BACKEND_URL': prod
        ? 'https://m.easyrentcars.com'
        : 'https://m.easyrentcars.com'
};