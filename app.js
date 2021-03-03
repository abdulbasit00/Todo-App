var list = document.getElementById("list");

 
firebase.database().ref('todos').on('child_added',function(data){
   
   var li = document.createElement("li")
   var liText = document.createTextNode(data.val().value)
   li.setAttribute("class","l")
   li.appendChild(liText)

   var btnDiv = document.createElement('div')

   var editBtn = document.createElement("button")
   var editText = document.createTextNode("Add")
   editBtn.setAttribute("class", "btn")
   editBtn.setAttribute('id',data.val().key)
   editBtn.setAttribute("onclick", "editItem(this)")
   editBtn.appendChild(editText)
   li.appendChild(editBtn)
   btnDiv.appendChild(editBtn)


   var delBtn = document.createElement("button")
   var delText = document.createTextNode("Delete")
   delBtn.setAttribute("class", "btn")
   delBtn.setAttribute('id',data.val().key)
   delBtn.setAttribute("onclick", "deleteItem(this )")
   delBtn.appendChild(delText)
   li.appendChild(delBtn)
   btnDiv.appendChild(delBtn)

    
   list.appendChild(li)
   todo_item.value = ""
   console.log(li)
   li.appendChild(btnDiv)
})



function addTodo(){
   var todo_item = document.getElementById("todo_item");
   var database = firebase.database().ref('todos')
   var key = database.push().key;
   var todo = {
   value: todo_item.value,
   key: key
}
database.child(key).set(todo)

 
}

function deleteItem(e){
firebase.database().ref('todos').child(e.id).remove()
e.parentNode.parentNode.remove()
}

function editItem(e){
 
  var val = prompt("Enter Updated value",e.parentNode.parentNode.firstChild.nodeValue)
  var editTodo = {
     value: val,
     key: e.id
  }
  
  firebase.database().ref('todos').child(e.id).set(editTodo)
  e.parentNode.parentNode.firstChild.nodeValue = val;
}


function deleteAll(){
    list.innerHTML = ""
   firebase.database().ref('todos').remove()// delete the whole questions object
}