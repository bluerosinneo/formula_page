class chemicalFormula{
    constructor(){
        this.elementMap = new Map();
        this.formulaCoef = 1;
        this.origFormula = "H2O";

        this.elementMap.set('H',2);
        this.elementMap.set('O',1);
    }

    showElementMap(){
        console.log(this.elementMap);
    }

    makeFormula(){

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
    
}