const fs = require('fs/promises')
const readline = require('readline')

const obj = [];

interface Tobj {
    name: String,
    children?: Tobj[]
}

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

r1.on('line', async (str: string) => {
    if (str === 'close') {
        r1.close()
    }
    const res = /^tree /.exec(str)
    if (res == null) {
        console.log(`命令出错`);
    } else {
        const path = str.replace(res[0], '');
        try {
            const file = await fs.stat(path)
            if (!file.isDirectory) {
                console.log(`输入的不是目录`);
            } else {
                tree(path, obj).then(res => treeSet(res))
            }
        } catch (e) {
            console.log(e);
        }
    }
})
r1.on('close', () => {
    console.log('退出程序')
})

const tree = async (fpath: string, treeArr: Tobj[]): Promise<Tobj[]> => {

    const node: string[] = await fs.readdir(fpath);

    for (let item of node) {

        const stat = await fs.stat(`${fpath}/${item}`);

        let newNode: Tobj = {
            name: item,
            children: []
        }

        treeArr.push(newNode);

        if (stat.isDirectory()) {
            newNode.children = await tree(`${fpath}/${item}`, newNode.children);
        }
    }
    return treeArr;
}

const charSet = {
    'node': '├── ',   // 节点
    'pipe': '│   ',   // 上下链接
    'last': '└── ',   // 最后
    'indent': '    '  // 间隔
};

const treeSet = (tree: Tobj[], str: String = '') => {
    tree.forEach((item, index) => {
        if (index === tree.length - 1) {
            console.log(`${str}${charSet.last}${item.name}`)
        }
        else console.log(`${str}${charSet.node}${item.name}`);
        if (item.children.length !== 0) {
            treeSet(item.children, `${str}${charSet.pipe}${charSet.indent}`);
        }
    })
}


