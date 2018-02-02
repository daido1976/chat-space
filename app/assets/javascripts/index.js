$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix" id="chat-group-user-${ user.id }">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    $("#user-search-result").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $("#user-search-result").empty();
      users.forEach(function(user) {
        appendUser(user);
      });
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });
});

$(function() {

  function appendMember(id, name) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-member-${id}'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}">削除</a>
              </div>`
  $("#chat-group-members").append(html)
}

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name");
    $("#chat-group-user-" + user_id).remove();
    appendMember(user_id, user_name);
  });
})

  $(function() {
    $("#chat-group-members").on("click", ".chat-group-user__btn--remove", function() {

    var user_id = $(this).data("user-id");
    $("#chat-group-member-" + user_id).remove();
  })
})
