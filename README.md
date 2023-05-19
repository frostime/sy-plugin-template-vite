[English](README_en_US.md)

本插件为社区第三方插件开发模板，在和官方开发模板提供了基本相平齐的功能的基础上，具有以下的特点：

1. 基于 vite 打包项目，支持热加载，在 dev 模式下无论是对代码还是 i18n 的修改都能自动跟踪
2. 采用软链接而非把项目放入 plugins 目录的方案开发，可以随意在同一个工作空间同时开发多个项目，且不用担心在思源中误删工程代码
3. 内置了对 svelte 框架的支持，相比较 react、vue 等基于虚拟 DOM 的方案，svelte 这类编译型框架更适合插件开发这种轻量级场景
4. 提供了 github action 模板，实现自动打包 package.zip 并发布到 release
5. 预先包装好了 siyuan.d.ts 模块，不需要手动替换 node_module 下的 siyuan 模块
6. 提供了 sy-dtype.d.ts 和 api.ts 文件，预先帮你封装好了 API 调用和常用数据类型

## 模板用法

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
    - 如果您的开发环境下没有安装 python，也可以自己手动创建软链接；windows 用户请参考 [mklink](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/mklink)
        - 注意：要确保软链接的名称和 plugin.json 中的 name 字段保持一致
    - 由于生成的软链接和 plugin name 相同，所以不要把工程目录放在 plugins 下（这一点和官方的模板相反）

4. 开发

    - 开启 pnpm dev 模式后，自动跟踪代码和 i18n README plugin.json，编译结果放在 dev 目录下
    - 新版思源已经允许使用软链接，所以无需把项目放在 plugin 下，思源就可以读取到 dev 目录下的改变

5. 手动发布「也可以选择自动发布」

    - pnpm build, 自动生成 package.zip


## 使用 Github action 自动发布

自带了 github action，可以自动打包发布，请遵循以下操作：

1. 设置项目 `https://github.com/OWNER/REPO/settings/actions` 页面向下划到 **Workflow Permissions**，打开配置

    ![](asset/action.png)

2. 需要发布版本的时候，push 一个格式为 `v*` 的 tag，github 就会自动打包发布 release（包括 package.zip）

3. 默认使用保守策略进行 pre-release 发布，如果觉得没有必要，更改 release.yml 的设置：

    ```yaml
    - name: Release
        uses: ncipollo/release-action@v1
        with:
            allowUpdates: true
            artifactErrorsFailBuild: true
            artifacts: 'package.zip'
            token: ${{ secrets.GITHUB_TOKEN }}
            prerelease: true # 把这个改为 false
    ```


## 致谢

- @terwer [terwer/siyuan-plugin-importer](https://github.com/terwer/siyuan-plugin-importer)
- @svchord [svchord/Rem-Craft](https://github.com/svchord/Rem-Craft)
- @zxhd863943427 [zxhd863943427/siyuan-color-scheme](https://github.com/zxhd863943427/siyuan-color-scheme)

