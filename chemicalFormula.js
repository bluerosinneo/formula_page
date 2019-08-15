class chemicalFormula{
    constructor(){
        this.elementMap = new Map();
        this.formulaCoef = 1;
        this.origFormula = "";


    }

    showElementMap(){
        console.log(this.elementMap);
    }

    makeFormulaHTML(){

        var myFormula = document.createElement("span");
        myFormula.setAttribute('class', 'formula');


        for (let [elementSym, elementNum] of this.elementMap) {
            
            var elementWithNumber = document.createElement("div");
            elementWithNumber.setAttribute('class', 'elementWithNumber');
            
            var elementSymbol = document.createElement("span");
            elementSymbol.setAttribute('class', 'elementSymbol');
            var textNode = document.createTextNode(elementSym);
            elementSymbol.appendChild(textNode);

            var elementNumber = document.createElement("span");
            elementNumber.setAttribute('class', 'elementNumber');
            textNode = document.createTextNode(elementNum);
            elementNumber.appendChild(textNode);

            elementWithNumber.appendChild(elementSymbol);
            elementWithNumber.appendChild(elementNumber);

            myFormula.appendChild(elementWithNumber);
        }
        
        return myFormula;
    }

    addElement(elementSym, elementNum){
        if (this.elementMap.has(elementSym)){
            this.elementMap.set(elementSym,this.elementMap.get(elementSym)+elementNum);
        }
        else{
            this.elementMap.set(elementSym,elementNum);
        }
    }
    
    lookNextElement(formulaText, loc){
        if (isUpper(formulaText[loc[0]])){
            var elementSym = "";
            var elementNum = 0;
            if((loc[0]+1)<formulaText.length && isLower(formulaText[loc[0]+1])){
                elementSym =formulaText[loc[0]]+formulaText[loc[0]+1];
                loc[0] = loc[0] + 2;
                elementNum = this.lookNextNumber(formulaText, loc);
                this.addElement(elementSym, elementNum);
                return;
            }
            else{
                elementSym = formulaText[loc[0]];
                loc[0] = loc[0] + 1;
                elementNum = this.lookNextNumber(formulaText, loc);
                this.addElement(elementSym, elementNum);
                return ; 
            }
        }
        loc[0] = loc[0] + 1;
        return;
    }

    lookNextNumber(formulaText, loc){
        var numberString = "";
        if(loc[0] < formulaText.length && isNum(formulaText[loc[0]])){
            while(isNum(formulaText[loc[0]])){
                numberString = numberString + formulaText[loc[0]];
                loc[0] = loc[0] + 1;
            }
            return parseInt(numberString);
        }
        return 1;
    }

    readTextToFormula(formulaText){
        // Isolation peren and brackets


        // scan for elementSym and elementNum
        var loc = [0];
        while (loc[0] < formulaText.length){
            this.lookNextElement(formulaText, loc);
        }

    }
}


function isAlpha(myChar) {
    return null != myChar.match(/[a-z]/i);
}

function isNum(myChar){
    return null != myChar.match(/[0-9]/i);
}

function isUpper(myChar){
    return isAlpha(myChar) && (myChar == myChar.toUpperCase());
}

function isLower(myChar){
    return isAlpha(myChar) && (myChar == myChar.toLowerCase());
}