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

}