// class for file viewer
import * as fs from 'fs';
import * as path from 'path';

export class FileViewer {
    private _docContent: string = "";
    private _returnDocument: string[] = [];

    private hex2a(hex: string) : string {
        var str = '';
        for (var i = 0; i < hex.length; i += 2) {
            if (hex.substr(i, 2) !== '00') {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            } else {
                str += "<00>";
            }
        }
        return str;
    }

    public getVbFile() : string[] {

        fs.readFile(path.join(__dirname, '../../../../Downloads/JRecord_0/SampleFiles/MF_VB_Test.bin'), 'hex', (error, data) => {
            if (!error) {
                this._docContent = data;
                this.convert();
            }
        });
        
        return this._returnDocument;
    }

    private convert() {
        let startPosition = 0;
        let lengthDataSet = 0;
        while (startPosition < this._docContent.length) {
        lengthDataSet = parseInt(this._docContent.substr(startPosition, 4),16);
        console.log(lengthDataSet);
        this._returnDocument.push("Length: " + lengthDataSet + " Content: " + this.hex2a(this._docContent.substr(startPosition + 8, (lengthDataSet - 4) * 2)));
        startPosition += lengthDataSet * 2;
        }
    }

}