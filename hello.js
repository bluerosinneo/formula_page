function addPara(thInput) {
    if (thInput.length > 0)
    {

        var myEquation = new chemicalEquation();
        myEquation.readTextToEquation(thInput);

        insertHTMLEquation(myEquation);


        let aMatrix = [
            [1,0,-3,0],
            [1,0,0,-2],
            [4,10,-4,-7],
            [0,4,-1,0]
        ];

        var myMatrix = new rowEchelon(aMatrix);

        while(myMatrix.findNextPivot()){
            myMatrix.pivotBlastAsh();
            myMatrix.simplifyMat();
        }

        myMatrix.simplifyRow(1);

        insertHTMLParagraph("simplify second row");

        insertHTMLMatrix(myMatrix.showMatrix())




        
        // insertHTMLParagraph("before first pivot");
        // insertHTMLMatrix(myMatrix.showMatrix());

        // myMatrix.findNextPivot();
        // myMatrix.pivotBlastAsh();

        // insertHTMLParagraph("after first pivot");
        // insertHTMLMatrix(myMatrix.showMatrix());

        // myMatrix.findNextPivot();
        // myMatrix.pivotBlastAsh();

        // insertHTMLParagraph("after second pivot");
        // insertHTMLMatrix(myMatrix.showMatrix());

        // myMatrix.findNextPivot();
        // myMatrix.pivotBlastAsh();

        // insertHTMLParagraph("after third pivot");
        // insertHTMLMatrix(myMatrix.showMatrix());
        

        // insertHTMLMatrix(myMatrix.showMatrix());
        // insertHTMLParagraph("do row swap");
        // myMatrix.swapRows(0,3);
        // insertHTMLMatrix(myMatrix.showMatrix());
        // myMatrix.findNextPivot();
        // insertHTMLParagraph("do pivot");
        // insertHTMLMatrix(myMatrix.showMatrix());
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