/**
 * Created by huk on 2019/3/19.
 */
let less = require('less');

function loader(source) {
    let css = '';
    less.render(source, (err, code) => {
        css = code.css;
    });
    css = css.replace(/\n/g, '\\n');
    return css;
}

module.exports = loader;