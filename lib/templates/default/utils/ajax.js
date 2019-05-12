import request from 'superagent';


/**
 * 基于superagent的ajax封装，客户端用
 ajax({
    url: '/api/xxx',
    type: 'get',
    data: {
      foo: 'foo',
      bar: 'bar',
    }
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
 */
export default (opts) => {

    const defaultOpts = {
        type: 'post',
        data: {}
    };

    const { type, url, data } = Object.assign({}, defaultOpts, opts);

    if (!url) {
        throw "no URL param has passed."
    }

    let ajax;
    if (type === 'post') {
        ajax = request.post(url)
            .type('form')
            .send(data)
            .then((res) => {
                return res.body;
            })
    } else {
        ajax = request.get(url)
            .query(data)
            .then((res) => {
                return JSON.parse(res.text);
            })
    }

    return ajax;
}