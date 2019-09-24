function addPara(thInput) {
    if (thInput.length > 0)
    {

        var myEquation = new chemicalEquation();
        myEquation.readTextToEquation(thInput);

        insertHTMLEquation(myEquation);



        myEquation.generateMasterElementMap();



        //don't want to have to lets for aMatrix
        let aMatrix = myEquation.generateMatrix();

        // let aMatrix = [
        //     [1,0,-3,0],
        //     [1,0,0,-2],
        //     [4,10,-4,-7],
        //     [0,4,-1,0]
        // ];

        // this aMatrix is overdiding the one 
        // generated from the chemical equation
        // let aMatrix = [
        //     [15,0,0,-2,0,0,-5],
        //     [0,12,0,-3,0,0,-7],
        //     [0,0,7,-1,0,0,-3],
        //     [0,0,0,0,3,0,-4],
        //     [0,0,0,0,0,5,-2]
        // ];

        var myMatrix = new rowEchelon(aMatrix);
        
        insertHTMLLatex(myMatrix.showMatrix());

        while(myMatrix.findNextPivot()){
            myMatrix.pivotBlastAsh();
            myMatrix.simplifyMat();
        }

        myMatrix.noLeadingNegative();

        insertHTMLLatex(myMatrix.showMatrix());



        let aBar = [1,2,3];
        let bBar = [3,5,7];
        myMatrix.addVectors(aBar,bBar);
        console.log(aBar);

        console.log(myMatrix.partialSolution(3));
        console.log(myMatrix.partialSolution(6));

        let solution = myMatrix.homogeneousSolution()

        console.log(solution);

        console.log(myMatrix.testSolution(solution));

        let factor = myMatrix.gCDBar(solution);
        for(let i = 0; i < solution.length; i++){
            if(solution[i]!=0){
                solution[i]=solution[i]/factor;
            }
        }

        console.log(solution);

        console.log(myMatrix.testSolution(solution));

        myEquation.setCoef(solution);

        myEquation.makeLatexEquation();

        insertHTMLLatex(myEquation.showLatexEquation());



    }
}

function insertHTMLLatex(matrix){
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

