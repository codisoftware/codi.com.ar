(function ($) {
  $(function () {
    var button = $("#submit");
    var requiredFieldMsg = "Required",
      minCharactersMsg = "The minimum of characters is 2",
      incorrectFormatMsg = "Incorrect format";
    var textarea = document.getElementById("message");


    $.validator.addMethod("onlyText", function (value, element) {
      return this.optional(element) || /^[A-zÀ-ÖØ-öø-ÿ',. ]+$/.test(value);
    });

    $.validator.addMethod("noSpace", function (value, element) {
      return this.optional(element) || value.trim().length != 0;
    });

    textarea.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });

    $("#codi-contact").validate({
      errorElement: "span",
      rules: {
        name: {
          required: true,
          minlength: 2,
          onlyText: true,
          noSpace: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: requiredFieldMsg,
          onlyText: incorrectFormatMsg,
          minlength: $.validator.format(minCharactersMsg),
          noSpace: incorrectFormatMsg,
        },
        email: {
          required: requiredFieldMsg,
          email: incorrectFormatMsg,
        },
      },
      submitHandler: function () {
        button.html("loading...");
        grecaptcha.execute();
      },
    });
  });
})(jQuery);

function onSubmit(token) {
  var $ = jQuery
  console.log('token', token);
  var result = $(".form-result");
  var button = $("#submit");
  var data = {
    action: "codi_contact_form",
    recaptcha: token,
    name: $("#name").val(),
    email: $("#email").val(),
    message: $("#message").val(),
  };
  $.ajax({
    crossDomain: true,
    url: 'https://api.codi.com.ar/send.php',
    type: "POST",
    data: data,
    beforeSend: function () {},
  })
      .done(function (data, textStatus, jqXHR) {
        if (data.status) {
          result.addClass("success");
          result.removeClass("error");
          result.html(textStatus);
          form.reset();
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        result.addClass("error");
        result.html(textStatus);
        console.log(textStatus);
      })
      .always(function () {
        button.html("Submit");
        setTimeout(() => {
          result.removeClass("error");
          result.removeClass("success");
          result.html("");
        }, 3000);
      });
}
