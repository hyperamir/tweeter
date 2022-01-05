$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function (event) {
    const $message = $(this).val();
    $(this).siblings('div').children('#counter').html(140 - $message.length);

    if ($message.length > 140) {
      $("#counter").css(
        'color', 'red'
      );
    }else{
      $("#counter").css(
        'color', '#545149'
      );
    }
  });
});