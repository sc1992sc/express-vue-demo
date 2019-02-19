/**
 * @author Mocker
 * @date 2017/3/28
 */

const fs = require('fs');
const _ = require('underscore');
const path = require("path");
const fsExtra = require('fs-extra');
/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param target {String} 复制到目标目录
 */
function _copyDir(src, target, callback, ignore_dir) {
    console.log(`==== 拷贝${src}到${target} ====`);
    fsExtra.ensureDirSync(target);
    _copy(src, target);
    function _copy(src, target) {
        let paths = fs.readdirSync(src);
        paths.forEach(function (_path) {
            let _src = path.join(src, _path);
            let _target = path.join(target, _path);
            if (!ignore_dir || !_.contains(ignore_dir, _src)) {
                let _srcState = fs.statSync(_src);
                if (_srcState.isFile()) {
                    fs.writeFileSync(_target, fs.readFileSync(_src));
                } else if (_srcState.isDirectory()) {
                    // 当是目录是，递归复制
                    if (ignore_dir) {
                        _copyDir(_src, _target, callback, ignore_dir)
                    } else {
                        _copyDir(_src, _target, callback);
                    }
                }
            }
        })
    }
}

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param target {String} 复制到目标目录
 */
function _copyFile(src, target) {
    fs.createReadStream(src).pipe(fs.createWriteStream(target));
}

let _rmdir = function (_path) {
    let files = [];
    if (fs.existsSync(_path)) {
        files = fs.readdirSync(_path);
        files.forEach(function (file, index) {
            let curPath = path.join(_path, file);
            console.log(`==== 清除${curPath} ====`);
            if (fs.statSync(curPath).isDirectory()) {
                _rmdir(curPath);
            } else {
                fs.unlinkSync(curPath, (err) => {
                    if (err) {
                        console.error(err)
                        return;
                    }
                });
            }
        })
        fs.rmdirSync(_path);
    }
}

const _removeSync = function(path){
    if(endWith(path, '/*')) {
        fsExtra.emptyDirSync(path.slice(0, path.length - 2));
        return ;
    }
    fsExtra.removeSync(path);
}

function endWith(source, end) {
    let _end = source.slice(source.length - end.length);
    return end == _end;
}

module.exports = {
    copyDir: _copyDir,
    copyFile: _copyFile,
    rmdir: _rmdir,
    removeSync: _removeSync
}