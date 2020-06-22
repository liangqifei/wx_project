module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    ["@babel/plugin-syntax-dynamic-import"], // 动态导入模块
    ["@babel/plugin-proposal-decorators", { legacy: true }], // 支持装饰器
    ["@babel/plugin-proposal-class-properties", { loose: true }], // 支持类属性和类方法
    ["import", { libraryName: "antd-mobile", style: "css" }], // `style: true` 会加载 less 文件
  ],
};
