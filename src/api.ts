import { Block, Notebook, NotebookConf, NotebookId, DocumentId, BlockId, doOperation, PreviousID, ParentID } from "sy-dtype";
import { fetchSyncPost, IWebSocketData } from "siyuan";


async function request(url: string, data: any) {
    let response: IWebSocketData = await fetchSyncPost(url, data);
    let res = response.code === 0 ? response.data : null;
    return res;
}


// **************************************** Noteboook ****************************************

interface ReslsNotebooks {
    notebooks: Notebook[];
}

///api/notebook/lsNotebooks
export async function lsNotebooks(): Promise<ReslsNotebooks> {
    let url = '/api/notebook/lsNotebooks';
    return request(url, '');
}

///api/notebook/openNotebook
export async function openNotebook(notebook: NotebookId) {
    let url = '/api/notebook/openNotebook';
    return request(url, { notebook: notebook });
}

///api/notebook/closeNotebook
export async function closeNotebook(notebook: NotebookId) {
    let url = '/api/notebook/closeNotebook';
    return request(url, { notebook: notebook });
}

///api/notebook/renameNotebook
export async function renameNotebook(notebook: NotebookId, name: string) {
    let url = '/api/notebook/renameNotebook';
    return request(url, { notebook: notebook, name: name });
}

///api/notebook/createNotebook
export async function createNotebook(name: string): Promise<Notebook> {
    let url = '/api/notebook/createNotebook';
    return request(url, { name: name });
}

///api/notebook/removeNotebook
export async function removeNotebook(notebook: NotebookId) {
    let url = '/api/notebook/removeNotebook';
    return request(url, { notebook: notebook });
}

interface ResGetNotebookConf {
    box: string;
    conf: NotebookConf;
    name: string;
}

///api/notebook/getNotebookConf
export async function getNotebookConf(notebook: NotebookId): Promise<ResGetNotebookConf> {
    let data = { notebook: notebook };
    let url = '/api/notebook/getNotebookConf';
    return request(url, data);
}

///api/notebook/setNotebookConf
export async function setNotebookConf(notebook: NotebookId, conf: NotebookConf): Promise<NotebookConf> {
    let data = { notebook: notebook, conf: conf };
    let url = '/api/notebook/setNotebookConf';
    return request(url, data);
}


// **************************************** Document ****************************************
// /api/filetree/createDocWithMd
export async function createDocWithMd(notebook: NotebookId, path: string, markdown: string): Promise<DocumentId> {
    let data = {
        notebook: notebook,
        path: path,
        markdown: markdown,
    };
    let url = '/api/filetree/createDocWithMd';
    return request(url, data);
}

// /api/filetree/renameDoc
export async function renameDoc(notebook: NotebookId, path: string, title: string): Promise<DocumentId> {
    let data = {
        doc: notebook,
        path: path,
        title: title
    };
    let url = '/api/filetree/renameDoc';
    return request(url, data);
}

// /api/filetree/removeDoc
export async function removeDoc(notebook: NotebookId, path: string) {
    let data = {
        doc: notebook,
        path: path,
    };
    let url = '/api/filetree/removeDoc';
    return request(url, data);
}

/**
 * 
 ** `/api/filetree/moveDocs`
    * 参数

    ```json
    {
        "fromPaths": ["/20210917220056-yxtyl7i.sy"],
        "toNotebook": "20210817205410-2kvfpfn",
        "toPath": "/"
    }
    ```

    * `fromPaths`：源路径
    * `toNotebook`：目标笔记本 ID
    * `toPath`：目标路径
 */
export async function moveDocs(fromPaths: string[], toNotebook: NotebookId, toPath: string) {
    let data = {
        fromPaths: fromPaths,
        toNotebook: toNotebook,
        toPath: toPath
    };
    let url = '/api/filetree/moveDocs';
    return request(url, data);
}


/**
 * 
* `/api/filetree/getHPathByPath`
* 参数

  ```json
  {
    "notebook": "20210831090520-7dvbdv0",
    "path": "/20210917220500-sz588nq/20210917220056-yxtyl7i.sy"
  }
  ```

    * `notebook`：笔记本 ID
    * `path`：路径
 */
export async function getHPathByPath(notebook: NotebookId, path: string): Promise<string> {
    let data = {
        notebook: notebook,
        path: path
    };
    let url = '/api/filetree/getHPathByPath';
    return request(url, data);
}

/**
 * 
* `/api/filetree/getHPathByID`
* 参数

  ```json
  {
    "id": "20210917220056-yxtyl7i"
  }
  ```

    * `id`：块 ID
 */
export async function getHPathByID(id: BlockId): Promise<string> {
    let data = {
        id: id
    };
    let url = '/api/filetree/getHPathByID';
    return request(url, data);
}

// **************************************** Asset Files ****************************************
/**
 ** `/api/asset/upload`
* 参数为 HTTP Multipart 表单

    * `assetsDirPath`：资源文件存放的文件夹路径，以 data 文件夹作为根路径，比如：
        * `"/assets/"`：工作空间/data/assets/ 文件夹
        * `"/assets/sub/"`：工作空间/data/assets/sub/ 文件夹

      常规情况下建议用第一种，统一存放到工作空间资源文件夹下。
    * `file[]`：上传的文件列表
 */

interface ResUpload {
    errFiles: string[];
    succMap: { [key: string]: string };
}

export async function upload(assetsDirPath: string, files: string[]): Promise<ResUpload> {
    let data = {
        assetsDirPath: assetsDirPath,
        file: files
    }
    let url = '/api/asset/upload';
    return request(url, data);
}

// **************************************** Block ****************************************
interface ResdoOperations {
    doOperations: doOperation[];
    undoOperations: doOperation[] | null;
}
/**
 * `/api/block/insertBlock`
* 参数

  ```json
  {
    "dataType": "markdown",
    "data": "foo**bar**{: style=\"color: var(--b3-font-color8);\"}baz",
    "previousID": "20211229114650-vrek5x6"
  }
  ```

    * `dataType`：待插入数据类型，值可选择 `markdown` 或者 `dom`
    * `data`：待插入的数据
    * `previousID`：前一个块的 ID，用于锚定插入位置
 */
export async function insertBlock(dataType: string, data: string, previousID: BlockId): Promise<ResdoOperations> {
    let data1 = {
        dataType: dataType,
        data: data,
        previousID: previousID
    }
    let url = '/api/block/insertBlock';
    return request(url, data1);
}

/**
 * * `/api/block/appendBlock`
* 参数

  ```json
  {
    "data": "foo**bar**{: style=\"color: var(--b3-font-color8);\"}baz",
    "dataType": "markdown",
    "parentID": "20220107173950-7f9m1nb"
  }
  ```

    * `dataType`：待插入数据类型，值可选择 `markdown` 或者 `dom`
    * `data`：待插入的数据
    * `parentID`：父块的 ID，用于锚定插入位置
 */
export async function appendBlock(dataType: string, data: string, parentID: BlockId | DocumentId): Promise<ResdoOperations> {
    let data1 = {
        dataType: dataType,
        data: data,
        parentID: parentID
    }
    let url = '/api/block/appendBlock';
    return request(url, data1);
}

/**
 ### 更新块

* `/api/block/updateBlock`
* 参数

  ```json
  {
    "dataType": "markdown",
    "data": "foobarbaz",
    "id": "20211230161520-querkps"
  }
  ```

    * `dataType`：待更新数据类型，值可选择 `markdown` 或者 `dom`
    * `data`：待更新的数据
    * `id`：待更新块的 ID
 */
export async function updateBlock(dataType: string, data: string, id: BlockId): Promise<ResdoOperations> {
    let data1 = {
        dataType: dataType,
        data: data,
        id: id
    }
    let url = '/api/block/updateBlock';
    return request(url, data1);
}

/**
 * * `/api/block/deleteBlock`
* 参数

  ```json
  {
    "id": "20211230161520-querkps"
  }
  ```

    * `id`：待删除块的 ID
 */
export async function deleteBlock(id: BlockId): Promise<ResdoOperations> {
    let data = {
        id: id
    }
    let url = '/api/block/deleteBlock';
    return request(url, data);
}


/**
 * `/api/block/moveBlock`
* 参数

  ```json
  {
    "id": "20230406180530-3o1rqkc",
    "previousID": "20230406152734-if5kyx6",
    "parentID": "20230404183855-woe52ko"
  }
  ```

    * `id`：待移动块 ID
    * `previousID`：前一个块的 ID，用于锚定插入位置
    * `parentID`：父块的 ID，用于锚定插入位置，`previousID` 和 `parentID` 不能同时为空，同时存在的话优先使用 `previousID`
 */
export async function moveBlock(id: BlockId, previousID: PreviousID | null = null, parentID: ParentID | null = null): Promise<ResdoOperations> {
    let data = {
        id: id,
        previousID: previousID,
        parentID: parentID
    }
    let url = '/api/block/moveBlock';
    return request(url, data);
}

/**
 * `/api/block/getBlockKramdown`
* 参数

  ```json
  {
    "id": "20201225220955-l154bn4"
  }
 */
interface ResGetBlockKramdown {
    id: BlockId;
    kramdown: string;
}

export async function getBlockKramdown(id: BlockId): Promise<ResGetBlockKramdown> {
    let data = {
        id: id
    }
    let url = '/api/block/getBlockKramdown';
    return request(url, data);
}

/**
 * `/api/block/getChildBlocks`
* 参数

  ```json
  {
    "id": "20230506212712-vt9ajwj"
  }
  ```

  * `id`：父块 ID
  * 标题下方块也算作子块
 */
export async function getChildBlocks(id: BlockId): Promise<Block[]> {
    let data = {
        id: id
    }
    let url = '/api/block/getChildBlocks';
    return request(url, data);
}

// **************************************** Attributes ****************************************
/**
 * 
* `/api/attr/setBlockAttrs`
* 参数

  ```json
  {
    "id": "20210912214605-uhi5gco",
    "attrs": {
      "custom-attr1": "line1\nline2"
    }
  }
  ```

    * `id`：块 ID
    * `attrs`：块属性，自定义属性必须以 `custom-` 作为前缀
 */
export async function setBlockAttrs(id: BlockId, attrs: { [key: string]: string }) {
    let data = {
        id: id,
        attrs: attrs
    }
    let url = '/api/attr/setBlockAttrs';
    return request(url, data);
}

/**
 ### 获取块属性

* `/api/attr/getBlockAttrs`
* 参数

  ```json
  {
    "id": "20210912214605-uhi5gco"
  }
  ```

    * `id`：块 ID
 */
export async function getBlockAttrs(id: BlockId): Promise<{ [key: string]: string }> {
    let data = {
        id: id
    }
    let url = '/api/attr/getBlockAttrs';
    return request(url, data);
}

// **************************************** SQL ****************************************

export async function sql(sql: string): Promise<any[]> {
    let sqldata = {
        stmt: sql,
    };
    let url = '/api/query/sql';
    return request(url, sqldata);
}

export async function getBlockByID(blockId: string): Promise<Block> {
    let sqlScript = `select * from blocks where id ='${blockId}'`;
    let data = await sql(sqlScript);
    return data[0];
}

// **************************************** Template ****************************************

interface ResGetTemplates {
    content: string;
    path: string;
}
/**
 * `/api/template/render`
* 参数

  ```json
  {
    "id": "20220724223548-j6g0o87",
    "path": "F:\\SiYuan\\data\\templates\\foo.md"
  }
  ```
    * `id`：调用渲染所在的文档 ID
    * `path`：模板文件绝对路径
 */
export async function render(id: DocumentId, path: string): Promise<ResGetTemplates> {
    let data = {
        id: id,
        path: path
    }
    let url = '/api/template/render';
    return request(url, data);
}


export async function renderSprig(template: string): Promise<string> {
    let url = '/api/template/renderSprig';
    return request(url, { template: template });
}

// **************************************** File ****************************************

/**
### 获取文件

* `/api/file/getFile`
* 参数

  ```json
  {
    "path": "/data/20210808180117-6v0mkxr/20200923234011-ieuun1p.sy"
  }
  ```
    * `path`：工作空间路径下的文件路径
* 返回值

  文件内容

### 写入文件

* `/api/file/putFile`
* 参数为 HTTP Multipart 表单

    * `path`：工作空间路径下的文件路径
    * `isDir`：是否为创建文件夹，为 `true` 时仅创建文件夹，忽略 `file`
    * `modTime`：最近访问和修改时间，Unix time
    * `file`：上传的文件
* 返回值

  ```json
  {
    "code": 0,
    "msg": "",
    "data": null
  }
  ```

### 删除文件

* `/api/file/removeFile`
* 参数

  ```json
  {
    "path": "/data/20210808180117-6v0mkxr/20200923234011-ieuun1p.sy"
  }
  ```
    * `path`：工作空间路径下的文件路径
* 返回值

  ```json
  {
    "code": 0,
    "msg": "",
    "data": null
  }
  ```

### 列出文件

* `/api/file/readDir`
* 参数

  ```json
  {
    "path": "/data/20210808180117-6v0mkxr/20200923234011-ieuun1p.sy"
  }
  ```
    * `path`：工作空间路径下的文件路径
* 返回值

  ```json
  {
    "code": 0,
    "msg": "",
    "data": [
        {
            "isDir": true,
            "name": "20210808180320-abz7w6k"
        },
        {
            "isDir": false,
            "name": "20210808180320-abz7w6k.sy"
        }
    ]
  }
  ```
 */
export async function getFile(path: string): Promise<string> {
    let data = {
        path: path
    }
    let url = '/api/file/getFile';
    return request(url, data);
}

export async function putFile(path: string, isDir: boolean, modTime: number, file: string) {
    let data = {
        path: path,
        isDir: isDir,
        modTime: modTime,
        file: file
    }
    let url = '/api/file/putFile';
    return request(url, data);
}

export async function removeFile(path: string) {
    let data = {
        path: path
    }
    let url = '/api/file/removeFile';
    return request(url, data);
}


interface ResReadDir {
    isDir: boolean;
    name: string;
}
export async function readDir(path: string): Promise<ResReadDir> {
    let data = {
        path: path
    }
    let url = '/api/file/readDir';
    return request(url, data);
}

/**
 * ### 导出 Markdown 文本

* `/api/export/exportMdContent`
* 参数

  ```json
  {
    "id": ""
  }
  ```

    * `id`：要导出的文档块 ID
* 返回值

  ```json
  {
    "code": 0,
    "msg": "",
    "data": {
      "hPath": "/0 请从这里开始",
      "content": "## 🍫 内容块\n\n在思源中，唯一重要的核心概念是..."
    }
  }
  ```

    * `hPath`：人类可读的路径
    * `content`：Markdown 内容
    * 
 */

interface ResExportMdContent {
    hPath: string;
    content: string;
}

export async function exportMdContent(id: BlockId): Promise<ResExportMdContent> {
    let data = {
        id: id
    }
    let url = '/api/export/exportMdContent';
    return request(url, data);
}

/**
 ### Pandoc

* `/api/convert/pandoc`
* 工作目录
    * 执行调用 pandoc 命令时工作目录会被设置在 `工作空间/temp/convert/pandoc/` 下
    * 可先通过 API [`写入文件`](#写入文件) 将待转换文件写入该目录
    * 然后再调用该 API 进行转换，转换后的文件也会被写入该目录
    * 最后调用 API [`获取文件`](#获取文件) 获取转换后的文件内容
        * 或者调用 API [`通过 Markdown 创建文档`](#通过-markdown-创建文档)
        * 或者调用内部 API `importStdMd` 将转换后的文件夹直接导入
* 参数

  ```json
  {
    "args": [
      "--to", "markdown_strict-raw_html",
      "foo.epub",
      "-o", "foo.md"
   ]
  }
  ```
 */
export async function pandoc(args: string[]) {
    let data = {
        args: args
    }
    let url = '/api/convert/pandoc';
    return request(url, data);
}


// **************************************** System ****************************************

/**
### 获取启动进度

* `/api/system/bootProgress`
* 不带参
* 返回值

  ```json
  {
    "code": 0,
    "msg": "",
    "data": {
      "details": "Finishing boot...",
      "progress": 100
    }
  }
  ```

### 获取系统版本

* `/api/system/version`
* 不带参
* 返回值

  ```json
  {
    "code": 0,
    "msg": "",
    "data": "1.3.5"
  }
  ```

### 获取系统当前时间

* `/api/system/currentTime`
* 不带参
* 返回值

  ```json
  {
    "code": 0,
    "msg": "",
    "data": 1631850968131
  }
  ```

    * `data`: 精度为毫秒
*/

export async function currentTime(): Promise<number> {
    return request('/api/system/currentTime', {});
}

export async function bootProgress(): Promise<number> {
    return request('/api/system/bootProgress', {});
}

export async function version(): Promise<string> {
    return request('/api/system/version', {});
}