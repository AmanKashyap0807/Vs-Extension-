import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class CatCodingPanel {
    public static currentPanel: CatCodingPanel | undefined;
    private readonly panel: vscode.WebviewPanel;
    private constructor(panel: vscode.WebviewPanel, private extensionUri: vscode.Uri) {
        this.panel = panel;
        this.panel.onDidDispose(() => this.dispose(), null);
    }

    public static createOrShow(extensionUri: vscode.Uri) {
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

    public update() {
        this.panel.webview.html = this.getHtmlForWebview(this.panel.webview);
    }

    private getHtmlForWebview(webview: vscode.Webview) {
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

    public dispose() {
        CatCodingPanel.currentPanel = undefined;
        this.panel.dispose();
    }
}
