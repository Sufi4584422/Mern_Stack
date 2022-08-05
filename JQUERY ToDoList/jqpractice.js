$(function () {
  $("#addbtn").click(handlebtnclick);
  $("#todos").on("click", "li", removeMe);
});

function handlebtnclick() {
  var newtodo = $("#newtodo").val();
  $("#todos").append("<li>" + newtodo + "</li>");
  if (!newtodo) {
    $("#newtodo").addClass("error");
    return;
  }
  $("#newtodo").removeClass("error");
  $("#newtodo").val("");

  // $("#todos li").click(removeMe);
}

function removeMe() {
  $(this).fadeOut();
}
