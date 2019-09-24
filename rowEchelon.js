class rowEchelon{
    constructor(matrix){
        this.matrix = matrix;
        this.nRows = this.matrix.length;
        this.nColumns = this.matrix[0].length;
        this.iPivot = 0;
        this.jPivot = 0;
    }

    showMatrix(){
        var htmlMatrix = document.createElement("p");
        htmlMatrix.setAttribute('class', 'matrix');

        let matrixString = "";

        matrixString = matrixString + "\\[ \\begin{bmatrix} ";

        for(let i = 0; i < this.nRows; i++){
            matrixString = matrixString + " ";
            for(let j = 0; j < this.nColumns; j++){
                matrixString = matrixString + this.matrix[i][j]
                if(j != this.nColumns -1){
                    matrixString = matrixString + "&";
                }
            }
            if(i != this.nRows -1){
                matrixString = matrixString + "\\\\";
            }
        }

        matrixString = matrixString + " \\end{bmatrix} \\]";

        var textNode = document.createTextNode(matrixString);
        htmlMatrix.appendChild(textNode);

        return htmlMatrix;
    }

    swapRows(i1,i2){
        let hold = this.matrix[i1];
        this.matrix[i1] = this.matrix[i2];
        this.matrix[i2] = hold;
    }

    findNextPivot(){
        // set columns first
        for(let j = this.jPivot; j < this.nColumns; j++){
            // looking for non zero element in that column
            for(let i = this.iPivot; i < this.nRows; i++){
                if(this.matrix[i][j] != 0){
                    if(i != this.iPivot){
                        this.swapRows(i, this.iPivot);
                    }
                    this.jPivot = j;
                    return true;
                }
            }
        }
        return false;
    }

    crossCross(i,j){
        this.matrix[i][j]=((this.matrix[this.iPivot][this.jPivot]*this.matrix[i][j])-(this.matrix[this.iPivot][j]*this.matrix[i][this.jPivot]))
    }

    pivotBlastAsh(){
        for(let i = 0; i < this.nRows; i++){
            for(let j = 0; j < this.nColumns; j++){
                if((i!=this.iPivot)&(j!=this.jPivot)){
                    this.crossCross(i,j);
                }
            }
        }
        for(let i = 0; i < this.nRows; i++){
            if(i!=this.iPivot){
                this.matrix[i][this.jPivot] = 0;
            }
        }
        this.iPivot = this.iPivot + 1;
        this.jPivot = this.jPivot + 1;
    }

    gCD(a,b){
        if(b>a){
            let temp = a;
            a = b;
            b = temp;
        }
        while(b>0){
            let temp = b;
            b = a%b;
            a = temp;
        }
        return a
    }



    gCDBar(aBar){
        let result = 1;
        if(aBar.length>0){
            result = aBar[0];
        }
        if(aBar.length>1){
            for(let i = 1; i < aBar.length; i++){
                result = this.gCD(result,aBar[i]);
            }
        }
        return result;
    }

    lCM(a,b){
        return ((a*b)/this.gCD(a,b));
    }

    lCMBar(aBar){
        let result = 1;
        if(aBar.length > 0){
            if(aBar[0] > 0){
                result = aBar[0];
            }
        }
        if(aBar.length > 1){
            for(let i = 1; i < aBar.length; i++){
                if(aBar[i] > 0){
                    result = this.lCM(result, aBar[i]);
                }
            }
        }
        return result;
    }

    // note that this function sets the sum of the two vectores to the first
    // ie aBar = aBar + bBar (under vectory adition defined)
    addVectors(aBar, bBar){
        if(aBar.length == bBar.length){
            for(let i = 0; i < aBar.length; i++){
                aBar[i] = aBar[i] + bBar[i];
            }
        }
    }

    simplifyRow(i){
        let nonZeroElements = [];
        for(let j = 0; j < this.nColumns; j++){
            if(this.matrix[i][j]!=0){
                if(this.matrix[i][j] < 0){
                    nonZeroElements.push(this.matrix[i][j]*(-1));
                }
                else{
                    nonZeroElements.push(this.matrix[i][j]);
                }
            }
        }
        let factor = this.gCDBar(nonZeroElements);
        for(let j = 0; j < this.nColumns; j++){
            if(this.matrix[i][j]!=0){
                this.matrix[i][j]=this.matrix[i][j]/factor;
            }
        }
    }

    multiplyByRow(iRow, k){
        if(iRow < this.nRows){
            for(let j = 0; j < this.nColumns; j++){
                this.matrix[iRow][j] = this.matrix[iRow][j] * k;
            }
        }
    }

    noLeadingNegative(){
        for(let i = 0; i < this.nRows; i++){
            let foundNegative = false;
            for(let j = 0; j < this.nColumns; j++){
                if(this.matrix[i][j] != 0){
                    if(this.matrix[i][j] < 0){
                        this.multiplyByRow(i,-1)
                    }
                    break;
                }
            }
        }
    }

    // function that tests each row of a matrix to see if it should be attempted
    // to be simplified
    // JS is ok with the let simplify = false; on each run of the outer loop
    simplifyMat(){
        for(let i = 0; i < this.nRows; i++){

            let simplify = false;

            for(let j = 0; j < this.nColumns; j++){
                if(this.matrix[i][j] != 0){
                    simplify = true;
                }
            }

            if(simplify){
                this.simplifyRow(i);
            }

        }
    }

    // create a partial solution to the homogeneous system of equations
    // must already be in a reduced row form
    // with leading non negative elements
    partialSolution(jFreedom){
        // create arays for numerator and denominator seperatly (defult is 0)
        let numeratorBar = new Array(this.nColumns).fill(0);
        let denominatorBar = new Array(this.nColumns).fill(0);

        // make sure that the freedom index is set properly
        numeratorBar[jFreedom] = 1;
        denominatorBar[jFreedom] = 1;
        
        // scans each row to capter elements that would be apart of the
        // partial solution
        // the leading non-zero non-negative element will be the denominator
        // leading before the freedom column
        // then the numerator will be from jFreedom (should be negative)
        for(let i = 0; i < this.nRows; i++){
            for(let j = 0; j < this.nColumns; j++){
                if((this.matrix[i][j] != 0) && j < jFreedom){
                    denominatorBar[j] = this.matrix[i][j];
                    numeratorBar[j] = this.matrix[i][jFreedom] * -1;
                    break;
                }
            }
        }

        // setting the freedom variable so we have all integers
        let multiple = this.lCMBar(denominatorBar);

        // create the final solution in the numberatorBar
        for(let j = 0; j < this.nColumns; j++){
            if(denominatorBar[j] != 0){
                numeratorBar[j] = (numeratorBar[j]*multiple)/denominatorBar[j];
            }
        }

        return numeratorBar;
    }

    homogeneousSolution(){
        // list of bools for if is a freedom column
        let degreeOfFreedomBoolArray = new Array(this.nColumns).fill(false);

        for(let i = 0; i < this.nRows; i++){
            // bool to see if we have found a leading non-zero non-negative
            let foundLeading = false;
            for(let j = 0; j < this.nColumns; j++){
                if((foundLeading == true) && (this.matrix[i][j] != 0)){
                    degreeOfFreedomBoolArray[j] = true;
                }
                if(this.matrix[i][j] > 0){
                    foundLeading = true;
                }
            }
        }

        // the solution
        let result = new Array(this.nColumns).fill(0);

        for(let j = 0; j < this.nColumns; j++){
            if(degreeOfFreedomBoolArray[j] == true){
                this.addVectors(result,this.partialSolution(j));
            }
        }

        return result;
    }

    testSolution(solutionBar){
        let result = []
        for(let i = 0; i < this.nRows; i++){
            let innerResult = 0;
            for(let j = 0; j < this.nColumns; j++){
                innerResult = innerResult + solutionBar[j]*this.matrix[i][j];
            }
            result.push(innerResult);
        }
        return result;
    }

}