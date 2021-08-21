// TODO APP //


let list = document.getElementById('list');


firebase.database().ref('todos').on('child_added', (data) => {
  //create li tag with text node

  let li = document.createElement('li');
  let li_text = document.createTextNode(data.val().value);
  li.appendChild(li_text);


  //create delete button

  let del_btn = document.createElement('button');
  let del_text = document.createTextNode("REMOVE");
  del_btn.setAttribute("class", 'delete');
  del_btn.setAttribute('id', data.val().key)
  del_btn.setAttribute("onclick", "deleteItem(this)")
  del_btn.append(del_text);  ////


  //create edit button//

  let edit_btn = document.createElement("button");
  let edit_text = document.createTextNode("EDIT");
  edit_btn.setAttribute("class", 'edit');
  edit_btn.setAttribute("onclick", 'editItem(this)');
  edit_btn.setAttribute('id', data.val().key)
  edit_btn.appendChild(edit_text);

  li.appendChild(edit_btn)

  li.appendChild(del_btn)


  list.appendChild(li);

  console.log(li);
})

addTodo = () => {

  let todo_item = document.getElementById("todo-item");

  let key = firebase.database().ref('todos').push().key

  let todo = {
    value: todo_item.value,
    key: key
  }
  console.log(todo)

  firebase.database().ref('todos').child(key).set(todo)



  todo_item.value = ''; //blank box

}




//Enter button function

let input = document.getElementById("todo-item");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", (enter) => {
  // Number 13 is the "Enter" key on the keyboard
  if (enter.keyCode === 13) {
    // Cancel the default action, if needed
    enter.preventDefault();
    // Trigger the button element with a click
    document.getElementById("moiz").click();
  }
});//////


//delete function

deleteItem = (e) => {
  e.parentNode.remove()
  firebase.database().ref('todos').child(e.id).remove()


}
//del all

delAll = () => {
  firebase.database().ref('todos').remove()
  list.innerHTML = "";
}

//edit Function

editItem = (e) => {
  let val = prompt("Enter What To Do ", e.parentNode.firstChild.nodeValue)
  let editTodo = {
    value: val,
    key: e.id
  }
  firebase.database().ref('todos').child(e.id).set(editTodo)
  e.parentNode.firstChild.nodeValue = val;

}

//===== END OF CODE =====//






