const path=require('path');
const os = require('os');
const fs = require('fs');
const readline = require('readline');
const zip = require('cross-zip');
const child_process = require('child_process');
const fsExtra = require('fs-extra');
const fileUtil=require('./fileUtil');
var allPath=require('./pathResolve');
const RELEASE_PATH = path.join(allPath.DIST_PATH);//打包后路径: .../dist
// var packagejson=path.join(__dirname,'../','package.json');

var release_folder='';//包存储文件夹名称
var store_arr=[];//存储配置文件对象
var store_delete_arr = [];//存储删除文件目录
var package_json = {};//package.json文件对象

//第零步：判断操作系统
let spawn_shell;
let build_command = '';
if(os.type=='Windows_NT'){
    console.log('操作系统：windows');
    spawn_shell='cmd.exe';
    build_command='buildApp';
}else{
    console.error('对不起，暂不支持window、linux后mac以外的操作系统');
    process.exit();
}

//第一步：清空dist目录
console.log('==== 清空dist目录 start====')
fsExtra.emptyDirSync(allPath.DIST_PATH);
console.log('==== 清空dist目录 end====')

//第二步：将app目录bable到dist目录下
console.log('==== app build start ====');
let npm_build=child_process.spawn('npm',['run',build_command],{
    cwd:allPath.APP_PATH,
    env:process.env,
    shell:spawn_shell,
    stdio:'inherit'
})
npm_build.on('close',(code)=>{
    console.log(`子进程退出码：${code}`);
    console.log('==== app build end ====');
    createReleaseFolder();
})

// 第三步： 创建打包目录
function createReleaseFolder(){
    readPackageJson();
    console.log(`==== 创建${release_folder} release 文件夹 start====`);
    console.log('==== 清除目标文件目录  start ====');
    fileUtil.rmdir(release_folder);
    console.log('==== 清除目标文件目录  end ====');
    fs.mkdirSync(release_folder);
    console.log(`==== 创建${release_folder} release 文件夹  end====\n`);
    readPackageConfig();
}
// 读取package.json文件
function readPackageJson() {
    console.log('==== 读取package.json文件  start====');
    const data = fs.readFileSync(path.join(allPath.ROOT_PATH, 'package.json'));
    package_json = JSON.parse(data);
    server_name = package_json.name;
    server_version = package_json.version;
    release_folder_name = package_json.name + '-' + server_version;
    release_folder = path.join(RELEASE_PATH, release_folder_name);
    console.log(`读取到项目名称为「${server_name}」,version: ${server_version}`);
    console.log(`release文件夹名称为「${release_folder_name}」`);
    console.log('==== 读取package.json文件  end ====\n');
}

//读取打包目录
function readPackageConfig() {
    console.log('==== 读取打包文件配置  start====');
    const rl = readline.createInterface({
        input: fs.createReadStream(path.join(allPath.ROOT_PATH, '/compile/.package_file'))
    });
    let arr_index = 0;
    let re = /\s+/;
    let singleObj = function (source, target) {
        this.source = source;
        this.target = target;
    }

    rl.on('line', (line) => {
        if (line != '' && line.indexOf('#') == -1) {
            arr_index++;
            var single_arr = line.split(re);
            if (single_arr.length != 2) {
                console.error(`文件配置错误，请检查${config_file_name}第${arr_index}行`);
                process.exit();
            }
            store_arr.push(new singleObj(path.join(allPath.ROOT_PATH, single_arr[0]),
                path.join(release_folder, single_arr[1])));
        }
    }).on('close', () => {
        console.log('==== 读取打包配置文件 end====\n');
        readDeletePackageConfig();
    });
}
//读取删除目录
function readDeletePackageConfig() {
    console.log('==== 读取删除文件配置  start====');
    const rl = readline.createInterface({
        input: fs.createReadStream(path.join(allPath.ROOT_PATH, '/compile/.package.ignore'))
    });
    rl.on('line', (line) => {
        if (line != '' && line.indexOf('#') == -1) {
            store_delete_arr.push(line);
        }
    }).on('close', () => {
        console.log('==== 读取删除配置文件 end====\n');
        deleteUselessFile();
    });
}

// 第四步： 删除多余文件
function deleteUselessFile() {
    console.log('==== 删除文件  start ====')
    store_delete_arr.forEach(function (file) {
        fileUtil.removeSync(path.join(allPath.DIST_PATH, file));
    })
    console.log('==== 删除文件 end====')
    copyFiles();
}

// 第五步： 复制文件
function copyFiles() {
    console.log('==== 复制文件  start ====');
    for (let i = 0;i < store_arr.length; i++) {
        let _source = store_arr[i].source;
        let _target = store_arr[i].target;
        if (fs.lstatSync(store_arr[i].source).isFile()) {
            fileUtil.copyFile(_source, _target);
        } else {
            fileUtil.copyDir(_source, _target, (err) => {
                console.error(err);
            })
        }
    }
    console.log('==== 复制文件  end ====');
    // copyNodeModule();
}