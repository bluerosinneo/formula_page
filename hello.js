function addPara(thInput) {
    if (thInput.length > 0)
    {

        var myEquation = new chemicalEquation();
        myEquation.readTextToEquation(thInput);

        insertHTMLEquation(myEquation);

        myEquation.generateMasterElementMap();
        let aMatrix = myEquation.generateMatrix();

        

        // let aMatrix = [
        //     [1,0,-3,0],
        //     [1,0,0,-2],
        //     [4,10,-4,-7],
        //     [0,4,-1,0]
        // ];

        var myMatrix = new rowEchelon(aMatrix);
        insertHTMLMatrix(myMatrix.showMatrix());

        while(myMatrix.findNextPivot()){
            myMatrix.pivotBlastAsh();
            myMatrix.simplifyMat();
        }

        myMatrix.noLeadingNegative();

        insertHTMLMatrix(myMatrix.showMatrix());

        let aBar = [1,2,3];
        let bBar = [3,5,7];
        myMatrix.addVectors(aBar,bBar);
        console.log(aBar);

    }
}

function insertHTMLMatrix(matrix){
    var element = document.getElementById("theoutput");
    element.appendChild(matrix);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function insertHTMLEquation(myEquation){
    var myHTMLEquation = myEquation.makeEquationHTML();
    var element = document.getElementById("theoutput");
    element.appendChild(myHTMLEquation);
}

function insertHTMLParagraph(someString){
    var parToInsert = document.createElement("p");
    var textNode = document.createTextNode(someString);
    parToInsert.appendChild(textNode);
    var element = document.getElementById("theoutput");
    element.appendChild(parToInsert);
}

