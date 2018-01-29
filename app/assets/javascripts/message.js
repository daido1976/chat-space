$(function() {
  function buildHTML(message) {
    var html =`
<div class='chat-main__body--message'>
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
    if (message.image.url == null) {
      html = `
<div class='chat-main__body--message'>
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
    </p>
  </div>
</div>`
    }
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
})
