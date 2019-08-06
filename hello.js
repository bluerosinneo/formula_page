function addPara(thInput) {
    console.log('hit');
    if (thInput.length > 0)
    {
    console.log('in if');
    var para = document.createElement("p");
    var node = document.createTextNode("! " + thInput + " !");
    para.appendChild(node);


    var element = document.getElementById("theoutput");
    element.appendChild(para);


    }
}