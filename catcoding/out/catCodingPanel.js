"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatCodingPanel = void 0;
const vscode = __importStar(require("vscode"));
class CatCodingPanel {
    extensionUri;
    static currentPanel;
    panel;
    constructor(panel, extensionUri) {
        this.extensionUri = extensionUri;
        this.panel = panel;
        this.panel.onDidDispose(() => this.dispose(), null);
    }
    static createOrShow(extensionUri) {
        const column = vscode.window.activeTextEditor ? vscode.ViewColumn.One : undefined;
        if (CatCodingPanel.currentPanel) {
            CatCodingPanel.currentPanel.panel.reveal(column);
            return;
        }
        const panel = vscode.window.createWebviewPanel('catCoding', 'Cat Coding', column || vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
        });
        CatCodingPanel.currentPanel = new CatCodingPanel(panel, extensionUri);
        CatCodingPanel.currentPanel.update();
    }
    update() {
        this.panel.webview.html = this.getHtmlForWebview(this.panel.webview);
    }
    getHtmlForWebview(webview) {
        const catGif = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'cat.gif'));
        return `<!DOCTYPE html>
<html>
  <body style="font-family: sans-serif; text-align:center;">
    <h1>Cat Coding 🐱💻</h1>
    <img src="${catGif}" width="300" />
    <p>Lines of code: <span id="count">0</span></p>
    <script>
      let c=0; setInterval(()=>{c++; document.getElementById('count').textContent=c;}, 800);
    </script>
  </body>
</html>`;
    }
    dispose() {
        CatCodingPanel.currentPanel = undefined;
        this.panel.dispose();
    }
}
exports.CatCodingPanel = CatCodingPanel;
//# sourceMappingURL=catCodingPanel.js.map