$(document).ready(function(){

  $("form").submit(function(event){
    event.preventDefault();
    var url = $("#url").val();
    var title = $("#title").val();
    var username = $("#username").val();
    $.ajax({
      url: "/create",
      type: "post",
      data: {image: {url: url, title: title, username: username}}
    })
    .done(function(data){
      var id = data.id;
      var newImage = $("<div class='image-container'></div>");
      newImage.attr("data-id", id);
      newImage.append("<div class='delete'>X</div>");
      newImage.append("<img src=" + url + " style='height: 100px; width: 100px'>");
      newImage.append("<h3>" + title + "</h3>");
      newImage.append("<p>posted by " + username + "</p>");
      newImage.hide();
      $("#images").append(newImage);
      newImage.fadeIn();
    });
  });

  $(document).on("click", ".delete", function(){
    var image = $(this).parent();
    var id = image.attr("data-id");
    console.log(id);
    $.ajax({
      url: "/destroy",
      type: "delete",
      data: {id: id}
    })
    .done(function(){
      image.fadeOut(300, function(){
        image.remove();
      });
    });
  });
});
