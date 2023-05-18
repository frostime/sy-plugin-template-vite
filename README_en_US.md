[English](README_en_US.md)

## Template usage

1. Use Template

2. Clone to local

3. Create development soft links

    - Create the dev directory
    - Run the ``scripts/make_dev_link.py`` script, passing in the absolute path to the plugins directory, e.g.

        ```powershell
        >> sudo python . \scripts\make_dev_link.py H:\temporary folder\SiYuanDevSpace\data\plugins
        Folder already exists, exit
        ```

    - You may need sudo to run it, I installed sudo myself on windows via scoop and can run it directly that way, normal windows users can first open the command line as administrator and then run it.
    - As the generated softlink is the same as the plugin name, do not put the project directory under plugins (this is contrary to the official template)

4. development

    - When pnpm dev mode is enabled, the code and i18n README plugin.json are automatically tracked and the compiled results are placed in the dev directory
    - The new version of SiYuan already allows soft links, so there is no need to put the project under plugin.

5. manual release (You can use github action instead)

    - pnpm build, automatically generates package.zip


## Github action

The github action is included and can be automatically packaged and published:

1. set the project `https://github.com/OWNER/REPO/settings/actions` page down to **Workflow Permissions** and open the configuration

    ! [](asset/action.png)

2. when you need to release a version, push a tag in the format `v*` and github will automatically package the realse for release (including package.zip)

3. use conservative measurements for pre-release releases by default, if you don't think this is necessary, change the settings in release.yml to

    ```yaml
    - name: Release
        uses: ncipollo/release-action@v1
        with.
            allowUpdates: true
            artifactErrorsFailBuild: true
            artifacts: 'package.zip'
            token: ${{ secrets.GITHUB_TOKEN }}
            prerelease: true # change this to false
    ```


## Dependencies

This item was modified from [terwer/siyuan-plugin-importer](https://github.com/terwer/siyuan-plugin-importer)


*** Translated with www.DeepL.com/Translator (free version) ***

