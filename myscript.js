// console.log("this is the first js page");
// var x = "2" * 8;
// console.log(x);
// var x = 9;
// var y = 4;

// function sum(a, b) {
// return a + b;
// }
// console.log(sum(x, y));

// var mysum = sum;
// console.log(mysum);
// function btnClicked() {
// alert("My Button Clicked!");
// }
function update() {
  alert("Results Updated!");
  console.log("Results Updated!");
  var input = document.getElementById("myinput");
  var output = document.getElementById("output");
  output.innerHTML = input.value;
  //   console.log(input.value);
}
console.log("Starting");
function handleAddNewToDo() {
  console.log("Add New To Do List");
}

function DoBindings() {
  console.log("Bindings!");
  var btn = document.getElementById("Addbtn");
  btn.onclick = handleAddNewToDo();
}
window.onload = DoBindings;
console.log("Finished");
