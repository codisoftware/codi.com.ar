(function ($) {
  $(function () {
    var result = $(".form-result");
    var form = document.getElementById("codi-contact");
    var button = $("#submit");
    var requiredFieldMsg = "Required",
      minCharactersMsg = "The minimum of characters is 2",
      incorrectFormatMsg = "Incorrect format";
    var textarea = document.getElementById("message");
    var recaptcha = document.getElementById("g-recaptcha-response");
    var SITE_KEY = jsRecaptcha.site_key;

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

    function loadReCaptcha() {
      grecaptcha.ready(function () {
        grecaptcha
          .execute(SITE_KEY, { action: "form_submission" })
          .then(function (token) {
            recaptcha.value = token;
          });
      });
    }
    loadReCaptcha();

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
        setTimeout(() => {
          var dataRecaptcha = {
            action: "codi_contact_recaptcha",
            g_recaptcha_response: recaptcha.value,
          };

          $.ajax({
            url: jsVars.ajax_url,
            type: "POST",
            data: dataRecaptcha,
            success: function (data) {
              console.log(data);
              if (data.status) {
                var data = {
                  action: "codi_contact_form",
                  nonce: jsVars.nonce,
                  name: $("#name").val(),
                  email: $("#email").val(),
                  message: $("#message").val(),
                };
                $.ajax({
                  url: jsVars.ajax_url,
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
            },
            error: function (error) {
              result.addClass("error");
              result.html(error.responseJSON.data);
              button.html("Submit");
              setTimeout(() => {
                result.removeClass("error");
                result.html("");
              }, 3000);
            },
          });
        }, 500);
      },
    });
  });
})(jQuery);
