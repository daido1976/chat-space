$(function() {
  function buildHTML(message) {
    if (message.image.url == null) {
      message.image.url = ""
    }
    var html =`
<div class='chat-main__body--message' data-message-id="${message.id}">
  <div class='chat-main__body--message-user'>
    <p>
      ${message.user_name}
    </p>
  </div>
  <div class='chat-main__body--message-time'>
    <p>
      ${message.time}
    </p>
  </div>
  <div class='chat-main__body--message-content'>
    <p>
      ${message.body}
      <img src="${message.image.url}"/>
    </p>
  </div>
</div>`
    return html;
  }
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $(".chat-main__body--message-lists").append(html)
      $(".message-area").val("")
      $(".hidden-file").val("")
      $(".submit").prop("disabled", false)
      $(".chat-main__body").animate({scrollTop:$(".chat-main__body")[0].scrollHeight}, 1000, "swing");
    })
    .fail(function() {
      alert("エラーが発生しました")
      $(".submit").prop("disabled", false);
    })
  })

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
  $.ajax({
    url: location.href,
    dataType: "json"
  })
  .done(function(json) {
    var id = $('.chat-main__body--message').last().data('message-id');
    json.messages.forEach(function(message) {
      if (message.id > id) {
    $(".chat-main__body--message-lists").append(buildHTML(message));
    }
    });
  })
  .fail(function() {
    alert("自動更新に失敗しました");
  })
  } else {
    clearInterval(interval);
  }}, 5000);
})

