var Question = []
var new_element_pos=0
var cor_op={1:"A",2:"B",3:"C",4:"D"};


function check(){
    form = document.getElementById("Form1");
    for(var j=0;j<form.length-2;j++){
        if(form.elements[j].value.toString() == ""){
            window.alert("All fields required");
            return;
        }
    }
    
    add_que();
}

function add_que(){

    form = document.getElementById("Form1");
    for(var j=0;j<Question.length;j++){
        if(Question[j][0]==form.elements[0].value){
            window.alert("Same question can't be added");
            return;
        }
    }
    
 
    
    q_obj={}
    for(var i=0;i<5;i++){
        q_obj[i]=form.elements[i].value;
    }
    q_obj[5]=cor_op[form.elements[5].value];
    
    Question.push(q_obj);
    

    show_it();
}

function show_it(){
    var d=document.createElement("div");
    d.className="que_container";
    d.id="que_id";
    var i=new_element_pos;
    new_element_pos++;

    var q_txt=document.createTextNode(Question[i][0]);

    var inner_d=document.createElement("div");
    inner_d.className = "que_text";
    inner_d.id = "que_text_id";
    inner_d.appendChild(q_txt);
    d.appendChild(inner_d);

    
    var a_lst=document.createElement("ol");
    a_lst.className="Ans_container";
    a_lst.style.listStyleType="upper-alpha";

    for(var k=1;k<5;k++){
        var li=document.createElement("li");
       

        var t=document.createElement("label")
        t.htmlFor = "Option " + k.toString();
        t.textContent = Question[i][k];
        
        li.appendChild(t);

        
        
        
        a_lst.appendChild(li);
    }
    d.appendChild(a_lst);

    

    // var e=document.getElementById("answer").value;
    var correct_ans=document.createTextNode("Correct option: "+Question[i][5]);
    d.appendChild(correct_ans);

    var b=document.createElement("input");
    b.type="button";
    b.title="Delete Question";
    b.value="X"
    b.className="Delete-button";    

    b.addEventListener("click",delete_item);
    b.id="Deleting";
    d.appendChild(b);


    var show_area=document.getElementById("Show-quiz");
    show_area.appendChild(d);
    i++;   
    document.getElementById("clear").click();
}

function delete_item(e){
    if(e.target.classList.contains("Delete-button")){
        if(confirm("Are you sure?")){
            var temp=e.target.parentNode;
            var qu_str=temp.getElementsByTagName("div").item(0).textContent;
            
            var sq=document.getElementById("Show-quiz");
            var t=sq.getElementsByTagName("div");
            
            for(var k=1,l=0;k<t.length;k+=2,l++){
                if(qu_str==t.item(k).textContent){
                    var parent = temp.parentNode;
                    var n=parent.removeChild(temp);
                    
                    Question.splice(l,1);
                    
                    new_element_pos--;
                    
                }
            }
        }
    }
}



function attempt(){
    if(Question.length==0){
        window.alert("Please add some questions first");
        return;
    }
    localStorage.setItem("Question-bank",JSON.stringify(Question));
    var n_window=window.open("attempt.html","_self");
}

function save(){
    if(Question.length==0){
        window.alert("There is nothing to save in file");
        return;
    }
    var name = window.prompt("Enter name of file to be stored");
    name = name.trim();
    localStorage.setItem(name,JSON.stringify(Question));
}

function load(){
    var s = "Files:\n";
    for(var k=0;k<localStorage.length;k++){
        s+=localStorage.key(k)+"\n";
    }
    var name = window.prompt(s+"\nEnter name of file which is to be loaded");
    name=name.trim();
    var flag=0;
    for(var k=0;k<localStorage.length;k++){
        if(name==localStorage.key(k)){
            flag++;
            var f = JSON.parse(localStorage.getItem(name));
            for(var j=0;j<f.length;j++){
                Question.push(f[j]);
                show_it();
            }
            break;
        }
    }
    if(flag==0){
        window.alert("Not found");
    }
}

