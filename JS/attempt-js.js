var Question=JSON.parse(localStorage.getItem("Question-bank"));
var q_cnt=1;

for(var i=0;i<Question.length;i++){
    var div = document.createElement("div");
    div.className = "Que_container";
    
    
    var lab = document.createElement("label");
    lab.for = "Question";

    var q = document.createElement("p");
    q.textContent = q_cnt.toString()+ ". "+ Question[i][0];

    div.appendChild(lab);
    div.appendChild(q);

    var div1 = document.createElement("div");
    div1.className = "options_outer_div";
    
    var list = {1:"A",2:"B",3:"C",4:"D"};
    for(var j=1;j<5;j++){
        
        var lab2 = document.createElement("label");
        lab2.for = list[j];
        lab2.innerHTML = "<span >"+list[j]+". </span>"+Question[i][j];
        
        var input = document.createElement("input");
        input.type = "radio";
        input.name = "Options"+q_cnt.toString();
        input.id = list[j];
        input.value = list[j];

        var div2 = document.createElement("div");
        div2.className = "options_inner_div";


        div2.appendChild(input);
        div2.appendChild(lab2);
        div1.appendChild(div2);
    }
    div.appendChild(div1);

    document.getElementById("attend").appendChild(div);
    q_cnt++;
}



document.getElementById("Cal").addEventListener("click",Calculate);
function Calculate(){
    var marks = 0;
    // var form = document.getElementById("Attempt_form");
    // console.log(form.elements);
    for(var i=0;i<Question.length;i++){
        var s = "Options"+(i+1).toString();
        var t = "input[name ="+ s +"]:checked"
        var checked = document.querySelector(t);
        if(checked == null) continue;
        if(checked.value == Question[i][5]){
            marks++;
        }
    }

    console.log(marks);
    
    var ob={"Result":marks};
    Question.push(ob);
    localStorage.setItem("Question",JSON.stringify(Question));
    location.href = "end.html";
}