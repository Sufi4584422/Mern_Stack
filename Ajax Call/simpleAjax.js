$(function () {
  $("#load").click(sendjax);
});

function sendjax() {
  console.log("sending request");
  $.get("students.txt", handleResponse);
  console.log("request sent");
}
function handleResponse(response) {
  console.log("response revcieved");
  $("#result").empty();
  $("#result").append(response);
}
