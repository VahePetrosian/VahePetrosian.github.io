module.exports = function (source) {
    let regexp = /[\'\"]\d+[\'\"]\s*\:.*?[\,\r]/g;
    let result = source.replace(regexp, '');
    return result;
}