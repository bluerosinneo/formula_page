function addPara(thInput) {
    if (thInput.length > 0)
    {

        var myEquation = new chemicalEquation();
        myEquation.readTextToEquation(thInput);

        var myHTMLEquation = myEquation.makeEquationHTML();
        var element = document.getElementById("theoutput");
        element.appendChild(myHTMLEquation);


        // var myFormula = new chemicalFormula();
        
        // myFormula.readTextToFormula(thInput,1);
        // var element = document.getElementById("theoutput");
        // element.appendChild(myFormula.makeFormulaHTML());

    }
}