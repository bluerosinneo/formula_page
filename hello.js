function addPara(thInput) {
    if (thInput.length > 0)
    {
    var para = document.createElement("p");
    var node = document.createTextNode("! " + thInput + " !");
    para.appendChild(node);


    var element = document.getElementById("theoutput");
    element.appendChild(para);


    }
}