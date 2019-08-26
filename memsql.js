$(document).ready(function() {
  const $regex = /^(\w+[\-\.])*\w+@(\w+\.)+[A-Za-z]+$/;
  const $businessEmail = $('#business-email');
  const $businessSize = $('#business-size');

  // Test email on focus out for validity
  $businessEmail.focusout(function() {
    let $emailValue = $businessEmail.val();
    // test email against regex
    if ($regex.test($emailValue) === false) {
      $(this).addClass('error');
      $('.email-container')
        .next()
        .css('display', 'block');
      $('.fa-exclamation-triangle').css('display', 'block');
      $('.fa-check-circle').css('display', 'none');
    } else {
      $(this).addClass('success');
      $(this).removeClass('errror');
      $('.email-container')
        .next()
        .css('display', 'none');
      $('.fa-exclamation-triangle').css('display', 'none');
      $('.fa-check-circle').css('display', 'block');
    }
  });

  // Test business size one focusout
  $businessSize.focusout(function() {
    let $selectValue = $businessSize.val();

    // test email against regex
    if ($selectValue === null) {
      $(this).addClass('error');
      $('.select-container')
        .next()
        .css('display', 'block');
    } else {
      $(this).addClass('success');
      $(this).removeClass('errror');
      $('.select-container')
        .next()
        .css('display', 'none');
    }
  });

  // Test form on submit
  $('#submit').click(function(e) {
    e.preventDefault();
    let $emailValue = $businessEmail.val();
    let $selectValue = $businessSize.val();
    let $radioBtn = $('input[type="radio"]:checked').val();
    let $error = false;
    // Test email with regex
    if ($regex.test($emailValue) === false) {
      $businessEmail.addClass('error');
      $('.email-container')
        .next()
        .css('display', 'block');
      $error = true;
    }
    if ($selectValue === null) {
      // test for select value
      $businessSize.addClass('error');
      $('.select-container')
        .next()
        .css('display', 'block');
      $error = true;
    }

    //test for radio value
    if ($radioBtn === undefined) {
      $('.radio-title')
        .next()
        .css('display', 'block');
      $error = true;
    } else {
      $('.radio-title')
        .next()
        .css('display', 'none');
    }

    // If no errors, run ajax request
    if ($error === false) {
      let $form = $('#form');
      let $formData = $($form).serialize();
      console.log($formData);
      $.ajax({
        type: 'POST',
        contentType: 'text/xml',
        url: $($form).attr('action'),
        data: $formData
      }).done(function() {
        if (
          $radioBtn === 'price' ||
          $radioBtn === 'document-storage' ||
          $radioBtn === 'full-text-search' ||
          $selectValue === '1-10'
        ) {
          $('.container').hide();
          $('.unqualified').show();
        } else {
          $('.container').hide();
          $('.qualified').show();
        }
      });
    } else {
      return false;
    }
  });
});
