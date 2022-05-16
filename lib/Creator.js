const {
  getTempRepo,
  getTagsByRepo
} = require('./api')
const Inquirer = require('inquirer')
const {
  loading
} = require('./utils')
const downloadGitRepo = require('download-git-repo')
const util = require('util')
const path = require('path')
const chalk = require("chalk");


class Creator {
  // 项目名称及项目路径
  // 把方法挂载到构造函数上
  constructor(name, target) {
    this.name = name;
    this.target = target;
    // 转化为 promise 方法
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 获取模板信息及用户最终选择的模板
  async getRepoInfo() {
    // 获取组织下的仓库信息
    let repoList = await getTempRepo();
    // 提取仓库名
    const repos = repoList.map((item) => item.name);
    // 选取模板信息
    let {
      repo
    } = await new Inquirer.prompt([{
      name: "repo",
      type: "list",
      message: "Please choose a template",
      choices: repos,
    }, ]);
    return repo;
  }

  // 获取版本信息及用户选择的版本
  async getTagInfo(repo) {
    let tagList = await getTagsByRepo(repo);
    const tags = tagList.map((item) => item.name);
    // 选取模板信息
    let {
      tag
    } = await new Inquirer.prompt([{
      name: "repo",
      type: "list",
      message: "Please choose a version",
      choices: tags,
    }, ]);
    return tag;
  }

  async download(repo, tag) {
    // 模板下载地址
    const templateUrl = `zhupp034/${repo}${tag ? "#" + tag : ""}`;
    // 调用 downloadGitRepo 方法将对应模板下载到指定目录
    await loading(
      "downloading template, please wait",
      this.downloadGitRepo,
      templateUrl,
      path.join(this.target) // 项目创建位置
    );
  }

  // 创建项目部分
  async create() {
    // const repo = await loading('加载中', this.getRepoInfo)
    try {
      const repo = await this.getRepoInfo()
      const tag = await this.getTagInfo(repo)
      await this.download(repo, tag)
    } catch (error) {
      console.log({error})
    }
    
   
   
    // 模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  npm install\r\n");
    console.log("  npm run dev\r\n");
  }
}

module.exports = Creator;