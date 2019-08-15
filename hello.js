function addPara(thInput) {
    if (thInput.length > 0)
    {
        var myFormula = new chemicalFormula();

        var element = document.getElementById("theoutput");
        element.appendChild(myFormula.makeFormula());

    }
}