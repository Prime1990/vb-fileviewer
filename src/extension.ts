'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FileViewer } from './fileviewer';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vb-fileviewer" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('This will be the FileViewer');
        let fileViewer = new FileViewer;
        vscode.window.showInformationMessage(fileViewer.testLog("Das ist eine Nachricht!"));
        
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        let selection = editor.selection;
        let text = editor.document.getText(selection);

        // Display a message box to the user
        vscode.window.showInformationMessage('Selected characters: ' + text.length);

    });

    let disposableFileViewer = vscode.commands.registerCommand('extension.viewVbFile', () => {
// Display a message box to the user
let fileViewer = new FileViewer;
vscode.window.showInformationMessage(fileViewer.testLog("Das ist eine Nachricht!"));
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposableFileViewer);
}

// this method is called when your extension is deactivated
export function deactivate() {
}