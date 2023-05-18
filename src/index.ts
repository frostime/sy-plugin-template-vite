import { Plugin, showMessage, Dialog } from "siyuan"
import Hello from "./hello.svelte"
import "./index.styl"

export default class SamplePlugin extends Plugin {

    async onload() {
        console.log("onload");
        showMessage("Hello World");
        this.addTopBar(
            {
                icon: "iconEmoji",
                "title": "Hello SiYuan",
                "callback": () => {
                    let dialog = new Dialog({
                        title: "Hello World",
                        content: `<div id="helloPanel"></div>`,
                    });
                    new Hello({
                        target: dialog.element.querySelector("#helloPanel"),
                        props: {
                            name: this.i18n.name,
                        }
                    });
                }
            }
        )
    }

    async onunload() {
        showMessage("Goodbye World");
    }
}
