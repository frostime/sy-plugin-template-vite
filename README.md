[English](README_en_US.md)

## 用法

1. Use Template

2. Clone 到本地

3. 建立开发软链接

    - 创建 dev 目录
    - 运行 `scripts/make_dev_link.py` 脚本，传入的参数为 plugins 目录的绝对路径，比如

        ```powershell
        ❯❯❯ sudo python .\scripts\make_dev_link.py H:\临时文件夹\SiYuanDevSpace\data\plugins
        已存在同名文件夹，退出
        ```

    - 可能需要 sudo 运行，我自己在 windows 上通过 scoop 安装了 sudo 可以直接这么运行，普通 windows 用户可以首先以管理员身份打开命令行，然后运行。
    - 由于生成的软链接和 plugin name 相同，所以不要把工程目录放在 plugins 下（这一点和官方的模板相反）

4. 开发

    - 开启 pnpm dev 模式后，自动跟踪代码和 i18n README plugin.json，编译结果放在 dev 目录下
    - 新版思源已经允许使用软链接，所以无需把项目放在 plugin 下，思源就可以读取到 dev 目录下的改变

5. 发布

    - pnpm build, 自动生成 package.zip


## 依赖

本项目修改自 [terwer/siyuan-plugin-importer](https://github.com/terwer/siyuan-plugin-importer)

