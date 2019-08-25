$(document).ready(function() {
  const $regex = /^(\w+[\-\.])*\w+@(\w+\.)+[A-Za-z]+$/;
  let $emailValue = $('#business-email').val();
  $('#submit').click(function(e) {
    e.preventDefault();
    console.log($emailValue);
    if (!$regex.test()) {
      $('#business-email').addClass('error');
    }
  });
});
