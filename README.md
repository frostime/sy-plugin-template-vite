[English](README_en_US.md)

## 用法

1. Use Template

2. Clone 到本地

3. 建立开发软链接

    运行 `scripts/make_dev_link.py` 脚本，传入的参数为 plugins 目录的绝对路径。
    可能需要 sudo 运行，windows 用户可以首先以管理员身份打开命令行，然后运行。

4. 开发

    - 开启 pnpm dev 模式后，自动跟踪代码和 i18n README plugin.json，编译结果放在 dev 目录下
    - 新版思源已经允许使用软链接，所以无需把项目放在 plugin 下，思源就可以读取到 dev 目录下的改变

5. 发布

    - pnpm build, 自动生成 package.zip


## 依赖

本项目修改自 [terwer/siyuan-plugin-importer](https://github.com/terwer/siyuan-plugin-importer)

