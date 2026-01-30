import * as vscode from 'vscode';
import { CatCodingPanel } from './catCodingPanel';

export function activate(context: vscode.ExtensionContext) {
	// Register the command that opens the Cat Coding webview
	const disposable = vscode.commands.registerCommand('catCoding.start', () => {
		CatCodingPanel.createOrShow(vscode.Uri.file(context.extensionPath));
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
