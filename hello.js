function addPara(thInput) {
    if (thInput.length > 0)
    {
        var myFormula = new chemicalFormula();

        // if(myFormula.findBrackOrPeren(thInput)){
        //     myFormula.breakInnerOuter(thInput,1);
        // }
        // console.log(thInput)
        




        myFormula.readTextToFormula(thInput,1);
        var element = document.getElementById("theoutput");
        element.appendChild(myFormula.makeFormulaHTML());

    }
}