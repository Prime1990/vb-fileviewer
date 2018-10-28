
/**
* Convert From/To Binary/Decimal/Hexadecimal in JavaScript
* https://gist.github.com/faisalman
*
* Copyright 2012-2015, Faisalman <fyzlman@gmail.com>
* Licensed under The MIT License
* http://www.opensource.org/licenses/mit-license
*/

(function(){

    class ConvertBase {
        constructor(num) {
            return {
                from: function (baseFrom) {
                    return {
                        to: function (baseTo) {
                            return parseInt(num, baseFrom).toString(baseTo);
                        }
                    };
                }
            };
        }
        // binary to decimal
        static bin2dec(num) {
            return ConvertBase(num).from(2).to(10);
        }
        // binary to hexadecimal
        static bin2hex(num) {
            return ConvertBase(num).from(2).to(16);
        }
        // decimal to binary
        static dec2bin(num) {
            return ConvertBase(num).from(10).to(2);
        }
        // decimal to hexadecimal
        static dec2hex(num) {
            return ConvertBase(num).from(10).to(16);
        }
        // hexadecimal to binary
        static hex2bin(num) {
            return ConvertBase(num).from(16).to(2);
        }
        // hexadecimal to decimal
        static hex2dec(num) {
            return ConvertBase(num).from(16).to(10);
        }
    }
        
    
    
    
    
    
    
    this.ConvertBase = ConvertBase;
    
})(this);

/*
* Usage example:
* ConvertBase.bin2dec('111'); // '7'
* ConvertBase.dec2hex('42'); // '2a'
* ConvertBase.hex2bin('f8'); // '11111000'
* ConvertBase.dec2bin('22'); // '10110'
*/