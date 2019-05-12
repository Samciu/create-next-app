import request from 'superagent';

/**
 * 用于请求api做服务端渲染的接口
 */
export default (opts) => {
    const { url, data = {}, cookie, ua = '' } = opts;

    if (!url) {
        throw "no URL param has passed."
    }

    return request.get(url).query(data).set({
        'Cookie': cookie,
        'User-Agent': ua
    })
};