const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require('./Creator')
const ora = require('ora');

const templateUrl = require('./template')


module.exports = async function (projectName, options) {
    // 获取当前工作目录
    const cwd = process.cwd();
    // 拼接得到项目目录
    const targetDirectory = path.join(cwd, projectName);
    // 判断目录是否存在
    //   if (fs.existsSync(targetDirectory)) {
    //     // 判断是否使用 --force 参数
    //     if (options.force) {
    //       // 删除重名目录(remove是个异步方法)
    //       await fs.remove(targetDirectory);
    //     } else {
    //       let { isOverwrite } = await new Inquirer.prompt([
    //         // 返回值为promise
    //         {
    //           name: "isOverwrite", // 与返回值对应
    //           type: "list", // list 类型
    //           message: "Target directory exists, Please choose an action",
    //           choices: [
    //             { name: "Overwrite", value: true },
    //             { name: "Cancel", value: false },
    //           ],
    //         },
    //       ]);
    //       // 选择 Cancel
    //       if (!isOverrite) {
    //         console.log("Cancel");
    //         return;
    //       } else {
    //         // 选择 Overwirte ，先删除掉原有重名目录
    //         console.log("\r\nRemoving");
    //         await fs.remove(targetDirectory);
    //       }
    //     }
    //   }

    new Inquirer.prompt([
        {
          name: "template",
          type: "list",
          message: "选择你的项目模板:",
          choices: templateUrl.map(item => item.name),
        },
      ]).then(({template}) => {
        const {url: tempUrl} = templateUrl.find(item => item.name === template)
        const creator = new Creator(projectName, targetDirectory);
        creator.create(tempUrl);
      });
    
};