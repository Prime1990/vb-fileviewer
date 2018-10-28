'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vb-fileviewer" is now active!');
    let disposableFileViewer = vscode.commands.registerCommand('extension.viewVbFile', () => {

        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Open'
        };

        vscode.window.showOpenDialog(options).then(fileUri => {

            if (fileUri) {
                fs.readFile(fileUri[0].fsPath, 'hex', (error, data) => {
                    if (!error) {
                        _docContent = data;
                        convert(output);
                    }
                });
            }
        }
        );
    });
    context.subscriptions.push(disposableFileViewer);

}



// this method is called when your extension is deactivated
export function deactivate() {
}

let _docContent: string = "";
let _returnDocument: string[] = [];

function hex2a(hex: string): string {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        if (parseInt(hex.substr(i, 2), 16) > 31  && 
            (parseInt(hex.substr(i, 2), 16) < 127 ||
            parseInt(hex.substr(i, 2), 16) > 159)) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        } else {
            str += ".";
        //    str += "<0x" + hex.substr(i, 2) + ">";
        }
    }
    return str;
}

function convert(callback: () => void) {
    let startPosition = 0;
    let lengthDataSet = 0;
    while (startPosition < _docContent.length) {
        lengthDataSet = parseInt(_docContent.substr(startPosition, 4), 16);
        console.log(lengthDataSet);
        _returnDocument.push("Length: " + (lengthDataSet - 4) + " Content: " + hex2a(_docContent.substr(startPosition + 8, (lengthDataSet - 4) * 2)));
        startPosition += lengthDataSet * 2;
    }
    callback();
}

function output() {
    let content = "";
    _returnDocument.forEach(element => {
        content += element + "\n";
    });
    var filePath = path.join(__dirname, "tmp.txt");
    fs.writeFileSync(filePath, content, 'latin1');

    var openPath = vscode.Uri.file(filePath);
    vscode.workspace.openTextDocument(openPath).then(doc => {
        vscode.window.showTextDocument(doc);
    });
}