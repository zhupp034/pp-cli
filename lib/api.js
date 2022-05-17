const axios = require("axios");

// 拦截全局请求响应
axios.interceptors.response.use((res) => {
  return res.data;
});

/**
 * 获取模板
 * @returns Promise 仓库信息
 */
async function getTempRepo(tempUrl) {
  return axios.get(`https://api.github.com/${tempUrl}`);
}

/**
 * 获取仓库下的版本
 * @param {string} tempUrl 模板名称
 * @returns Promise 版本信息
 */
async function getTagsByRepo(tempUrl) {
  return axios.get(`https://api.github.com/repos/${tempUrl}/tags`);
}



module.exports = {
    getTempRepo,
    getTagsByRepo,
};
