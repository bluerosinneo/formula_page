class chemicalEquation{
    constructor(){
        this.reactantMap = new Map();
        this.productMap = new Map();
        this.masterElementMap = new chemicalFormula();
        this.origEquation = "";
    }

    readTextToEquation(equationString){
        let endReactants = equationString.indexOf("-");
        let startProducts = equationString.indexOf(">");
        let reactantsString = equationString.substring(0,endReactants);
        let productsString = equationString.substring(startProducts + 1);

        var formulaCounter = {};
        formulaCounter[0] = 0;

        let formulaString = "";

        // Handle Reactants
        while(reactantsString.includes("+")){
            let plusLocation = reactantsString.indexOf("+");
            let formulaString = reactantsString.substring(0,plusLocation).trim();
            reactantsString = reactantsString.substring(plusLocation+1).trim();
            this.addFormula(true,formulaString,formulaCounter);
        }
        if(reactantsString.length > 0){
            this.addFormula(true,reactantsString,formulaCounter);
        }

        // Handle Produts
        while(productsString.includes("+")){
            let plusLocation = productsString.indexOf("+");
            let formulaString = productsString.substring(0,plusLocation).trim();
            productsString = productsString.substring(plusLocation+1).trim();
            this.addFormula(false,formulaString,formulaCounter);
        }
        if(productsString.length > 0){
            this.addFormula(false,productsString,formulaCounter);
        }

    }


    addFormula(reactantBool, formulaText, formulaCounter){
        if(reactantBool == true){
            this.reactantMap.set(formulaCounter[0],new chemicalFormula());
            this.reactantMap.get(formulaCounter[0]).readTextToFormula(formulaText,1);
            formulaCounter[0] = formulaCounter[0] + 1;
        }
        else{
            this.productMap.set(formulaCounter[0],new chemicalFormula());
            this.productMap.get(formulaCounter[0]).readTextToFormula(formulaText,1);
            formulaCounter[0] = formulaCounter[0] + 1;
        }
    }

    
    generateMasterElementMap(){

        // counter for number of reactant/products formulas
        let nReactants = this.reactantMap.size;
        let nProducts = this.productMap.size;

        for(let i = 0; i < nReactants; i++){
            for (let sym of this.reactantMap.get(i).elementMap.keys()){
                this.masterElementMap.addElement(sym,1);
            }
        }
        for(let i = nReactants; i < (nReactants + nProducts); i++){
            for (let sym of this.productMap.get(i).elementMap.keys()){
                this.masterElementMap.addElement(sym,1);
            }
        }
        
    }

    generateMatrix(){
        //matrix to return
        let aMat = [];

        // counter for number of reactant/products formulas
        let nReactants = this.reactantMap.size;
        let nProducts = this.productMap.size;

        for (let sym of this.masterElementMap.elementMap.keys()){
            // temp row of matrix
            let aBar = [];

            for(let i = 0; i < nReactants; i++){
                if(this.reactantMap.get(i).elementMap.get(sym) != null){
                    aBar.push(this.reactantMap.get(i).elementMap.get(sym));
                }
                else{
                    aBar.push(0);
                }
            }
            for(let i = nReactants; i < (nReactants + nProducts); i++){
                if(this.productMap.get(i).elementMap.get(sym) != null){
                    aBar.push(this.productMap.get(i).elementMap.get(sym)*(-1));
                }
                else{
                    aBar.push(0);
                }
            }
            aMat.push(aBar);
        }
        return aMat;
    }

    makeEquationHTML(){
        var myEquation = document.createElement("div");
        myEquation.setAttribute('class', 'equation');

        let nReactants = this.reactantMap.size;
        let nProducts = this.productMap.size;
 
        for(let i = 0; i < nReactants; i++){

            myEquation.appendChild(this.reactantMap.get(i).makeFormulaHTML());
            if( i+1 != nReactants ){
                let plusSpan = document.createElement("span")
                plusSpan.setAttribute('class','plus')
                let textNode = document.createTextNode("+");
                plusSpan.appendChild(textNode);

                myEquation.appendChild(plusSpan);
            }
        }

        if(true){
            let plusSpan = document.createElement("span")
            plusSpan.setAttribute('class','arrow')
            let textNode = document.createTextNode("->");
            plusSpan.appendChild(textNode);

            myEquation.appendChild(plusSpan);
        }

        for(let i = nReactants; i < nReactants + nProducts; i++){
            myEquation.appendChild(this.productMap.get(i).makeFormulaHTML());
            if( i+1 != nReactants + nProducts){
                let plusSpan = document.createElement("span")
                plusSpan.setAttribute('class','plus')
                let textNode = document.createTextNode("+");
                plusSpan.appendChild(textNode);

                myEquation.appendChild(plusSpan);
            }
        }

        return myEquation;

    }

}