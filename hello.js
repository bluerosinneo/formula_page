function addPara(thInput) {
    if (thInput.length > 0)
    {
        var myFormula = new chemicalFormula();

        console.log(myFormula.findBrackOrPeren(thInput));

        




        // myFormula.readTextToFormula(thInput);
/*         var element = document.getElementById("theoutput");
        element.appendChild(myFormula.makeFormulaHTML()); */

    }
}