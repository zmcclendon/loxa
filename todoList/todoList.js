function create(value)
{
  if(event.keyCode==13)
  {
    var uniqueKey = new Date().valueOf();
    var todo = document.getElementById("newTask").value;
    todo = todo.replace(/[^A-Za-z-_0-9\s]/g, "");
    document.getElementById("newTask").value="";
    if(todo=="")
    {
      console.log("no entry given")
    }
    else
    {
      localStorage.setItem(uniqueKey,todo);
      document.getElementById("list2").innerHTML = "";
      document.getElementById("deleteButtons").innerHTML = "";
      updateList();
    }
  }
}

function removeEntry(index)
{
  localStorage.removeItem(index);
  document.getElementById("list2").innerHTML = "";
  document.getElementById("deleteButtons").innerHTML = "";
  updateList();
}


function confirmChanged(key)
{
  if(event.keyCode==13)
  {
    var todo = document.getElementById(key).innerHTML;
    if(todo=="")
    {
      console.log("no entry given")
    }
    else
    {
      todo = todo.replace(/[^A-Za-z-_0-9\s]/g, "");
      localStorage.setItem(key,todo);
      document.getElementById("list2").innerHTML = "";
      document.getElementById("deleteButtons").innerHTML = "";
      updateList();
    }
  }
}


//Add safety
//number of items no popups and

//read all from local storage
  function updateList(){
    var newHtml='';
    var ul = document.getElementById("list2");
    var dl = document.getElementById("deleteButtons");
    for(var i = 0; i < localStorage.length;i++)
    {
      //li.appendChild(document.createTextNode(localStorage.getItem(i)));
      //ul.appendChild(li);
      var li = document.createElement("li");
      var di = document.createElement("li");
      newHtml=(localStorage.getItem(localStorage.key(i)));
      //li.appendChild(document.createTextNode(newHtml));
      var span = document.createElement("span");
      span.setAttribute("contenteditable","true");
      span.setAttribute("id",localStorage.key(i));
      span.setAttribute("onkeydown","confirmChanged("+localStorage.key(i)+")");
      span.innerHTML = newHtml;
      li.appendChild(span);
      var button = document.createElement("button");
      button.setAttribute("onclick","removeEntry("+localStorage.key(i)+")");
      button.setAttribute("class","deleteList");
      button.innerHTML="X"
      li.appendChild(button);
      //di.appendChild(button);
      ul.appendChild(li);
      //dl.appendChild(di);
    }
    //document.getElementById("list").innerHTML=newHtml;
    return 1;
}
updateList();
