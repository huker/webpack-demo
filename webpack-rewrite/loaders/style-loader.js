/**
 * Created by huk on 2019/3/19.
 */

function loader(source) {
    let style = `
    let ele = document.createElement('style');
    ele.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(ele);
    `;
    return style
}

module.exports = loader;