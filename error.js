/**
 * Created by yh on 2016/6/21.
 */

var koa = require('koa');
var app = koa();

app.on('error', function (err, ctx) {
    if(process.env.NODE_ENV != 'test') {
        console.log(err.message);
        console.log(err);
    }
});

app.listen(3000);

app.use(function *(){
    throw new Error('demo error');
});