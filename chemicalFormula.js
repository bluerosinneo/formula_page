class chemicalFormula{
    constructor(){
        this.elementMap = new Map();
        this.formulaCoef = 1;
        this.origFormula = "";
        this.latexFormula = "";
    }

    showElementMap(){
        console.log(this.elementMap);
    }

    makeLatexFormula(){
        let formula = this.origFormula;

        for(let i = 0; i < formula.length; i++){

            if(isNum(formula[i])){
                if( ((i-1) >= 0) && ( (isAlpha(formula[i-1])) || ( formula[i-1] == ")" ) || ( formula[i-1] == "]" ) )){
                
                    let numberString = "";

                    while(i < formula.length && isNum(formula[i])){
                        numberString = numberString + formula[i];
                        i = i + 1;
                    }

                    // need to back up on the i
                    i = i -1;
                    
                    this.latexFormula = this.latexFormula + "_{" + numberString + "}";

            
                }
                else{
                    this.latexFormula = this.latexFormula + formula[i];
                }
            }
            else if(formula[i] == "."){
                this.latexFormula = this.latexFormula + " \\cdot ";
            }
            else{
                this.latexFormula = this.latexFormula + formula[i];
            }
        }
    }

    showLatexFormula(){
        var htmlLatex = document.createElement("p");
        htmlLatex.setAttribute('class', 'matrix');

        let formulaString = "";

        formulaString = formulaString + " \\[ ";

        formulaString = formulaString + this.latexFormula;

        formulaString = formulaString + " \\] ";

        var textNode = document.createTextNode(formulaString);
        htmlLatex.appendChild(textNode);

        //console.log(formulaString);

        return htmlLatex;
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
    
    lookNextElement(formulaText, loc, formulaSubscript){
        if (isUpper(formulaText[loc[0]])){
            var elementSym = "";
            var elementNum = 0;
            if((loc[0]+1)<formulaText.length && isLower(formulaText[loc[0]+1])){
                elementSym =formulaText[loc[0]]+formulaText[loc[0]+1];
                loc[0] = loc[0] + 2;
            }
            else{
                elementSym = formulaText[loc[0]];
                loc[0] = loc[0] + 1;
            }
            elementNum = this.lookNextNumber(formulaText, loc);
            this.addElement(elementSym, elementNum*formulaSubscript);
            return;
        }
        loc[0] = loc[0] + 1;
        return;
    }

    lookNextNumber(formulaText, loc){
        var numberString = "";
        // if catches if there is a writen subscript or not
        // while actually captures the subscript no matter the length
        if(loc[0] < formulaText.length && isNum(formulaText[loc[0]])){
            while(loc[0] < formulaText.length && isNum(formulaText[loc[0]])){
                numberString = numberString + formulaText[loc[0]];
                loc[0] = loc[0] + 1;
            }
            return parseInt(numberString);
        }
        return 1;
    }

    readTextToFormula(formulaText, coef){
        if(this.origFormula.length == 0){
            this.origFormula = formulaText;
        }
        if(this.findDot(formulaText)){
            formulaText = this.breakDot(formulaText, coef);
        }
        if(this.findBrackOrPeren(formulaText)){
            formulaText = this.breakInnerOuter(formulaText,coef);
        }
        var loc = [0];
        while (loc[0] < formulaText.length){
            this.lookNextElement(formulaText, loc, coef);
        }

    }

    findDot(formulaText){
        let result = false;
        if(formulaText.includes(".")){
            result = true;
        }
        return result;
    }

    breakDot(formulaText, formulaSubscript){
        let dotLocation = formulaText.indexOf(".");
        let loc = [];
        loc[0] = dotLocation+1;
        let dotCoef = this.lookNextNumber(formulaText, loc);
        if(loc[0] < formulaText.length){
            this.readTextToFormula(formulaText.substring(loc[0]), formulaSubscript*dotCoef)
        }
        return formulaText.substring(0, dotLocation);
    }

    findBrackOrPeren(formulaText){
        let result = false;
        if(formulaText.includes("(") && formulaText.includes(")")){
            result = true;
        }
        if(formulaText.includes("[") && formulaText.includes("]")){
            result = true;
        }
        return result;
    }

    breakInnerOuter(formulaText, formulaSubscript){
        // formulaText = formulaText.replace("[","(");
        // formulaText = formulaText.replace("]",")");
        
        let start = 0;
        let end = 0;
        
        if((formulaText.indexOf("(") > 0) && (formulaText.indexOf("[") > 0)){
            if(formulaText.indexOf("(") < formulaText.indexOf("[")){
                start = formulaText.indexOf("(");
                end = formulaText.lastIndexOf(")");
            }
            else{
                start = formulaText.indexOf("[");
                end = formulaText.lastIndexOf("]");
            }
        }
        else if(formulaText.indexOf("(") > 0){
            start = formulaText.indexOf("(");
            end = formulaText.lastIndexOf(")");
        }
        else if(formulaText.indexOf("[") >0){
            start = formulaText.indexOf("[");
            end = formulaText.lastIndexOf("]");
        }

        // let start = formulaText.indexOf("(");
        // let end = formulaText.lastIndexOf(")");
        
        let beforeText = formulaText.substring(0,start);
        let loc = [];
        loc[0] = end + 1;
        let elementNum = this.lookNextNumber(formulaText, loc); 
        let innerText = formulaText.substring(start+1,end);
        let afterText = formulaText.substring(loc[0]);
        this.readTextToFormula(innerText,formulaSubscript*elementNum);
        return beforeText + afterText;
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