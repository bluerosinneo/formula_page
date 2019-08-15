function addPara(thInput) {
    if (thInput.length > 0)
    {
        var myFormula = new chemicalFormula();

        var loc = 0;
        while (loc < thInput.length){
            loc = myFormula.lookNextElement(thInput, loc);
        }
        
/*         var element = document.getElementById("theoutput");
        element.appendChild(myFormula.makeFormula()); */

    }
}