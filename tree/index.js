var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var fs = require('fs/promises');
var readline = require('readline');
var obj = [];
var r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
r1.on('line', function (str) { return __awaiter(_this, void 0, void 0, function () {
    var res, path, file, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (str === 'close') {
                    r1.close();
                }
                res = /^tree /.exec(str);
                if (!(res == null)) return [3 /*break*/, 1];
                console.log("\u547D\u4EE4\u51FA\u9519");
                return [3 /*break*/, 5];
            case 1:
                path = str.replace(res[0], '');
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, fs.stat(path)];
            case 3:
                file = _a.sent();
                if (!file.isDirectory) {
                    console.log("\u8F93\u5165\u7684\u4E0D\u662F\u76EE\u5F55");
                }
                else {
                    tree(path, obj).then(function (res) { return treeSet(res); });
                }
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
r1.on('close', function () {
    console.log('退出程序');
});
var tree = function (fpath, treeArr) { return __awaiter(_this, void 0, void 0, function () {
    var node, _i, node_1, item, stat, newNode, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, fs.readdir(fpath)];
            case 1:
                node = _b.sent();
                _i = 0, node_1 = node;
                _b.label = 2;
            case 2:
                if (!(_i < node_1.length)) return [3 /*break*/, 6];
                item = node_1[_i];
                return [4 /*yield*/, fs.stat(fpath + "/" + item)];
            case 3:
                stat = _b.sent();
                newNode = {
                    name: item,
                    children: []
                };
                treeArr.push(newNode);
                if (!stat.isDirectory()) return [3 /*break*/, 5];
                _a = newNode;
                return [4 /*yield*/, tree(fpath + "/" + item, newNode.children)];
            case 4:
                _a.children = _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/, treeArr];
        }
    });
}); };
var charSet = {
    'node': '├── ',
    'pipe': '│   ',
    'last': '└── ',
    'indent': '    ' // 间隔
};
var treeSet = function (tree, str) {
    if (str === void 0) { str = ''; }
    tree.forEach(function (item, index) {
        if (index === tree.length - 1) {
            console.log("" + str + charSet.last + item.name);
        }
        else
            console.log("" + str + charSet.node + item.name);
        if (item.children.length !== 0) {
            treeSet(item.children, "" + str + charSet.pipe + charSet.indent);
        }
    });
};
