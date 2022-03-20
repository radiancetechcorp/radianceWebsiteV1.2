$("#contactForm").validator().on("submit", function (event) {
    var proceed = true;

    $("#contactForm input, #contactForm textarea").each(function () {
        $(this).css('border-color', '');
        if (!$.trim($(this).val())) { //if this field is empty
            $(this).css('border-color', 'red'); //change border color to red
            proceed = false; //set do not proceed flag
            submitMSG(false, "Please fill all fields in the form.");
        }
        //check invalid email
        //var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        //if ($(this).attr("name") == "email" && !email_reg.test($.trim($(this).val()))) {
        //    $(this).css('border-color', 'red'); //change border color to red
        //    proceed = false; //set do not proceed flag
        //    submitMSG(false, "Please enter valid email address.");
        //}
    
    });
    var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!email_reg.test($.trim(document.getElementById("contactForm").elements["email"].value))) {
    $(this).css('border-color', 'red'); //change border color to red
    proceed = false; //set do not proceed flag
        submitMSG(false, "Please enter valid email address.");
        return false;
}

    if (proceed == true) {
        event.preventDefault();
        submitForm();
    }
   
});

function submitForm(){
    // Initiate Variables With Form Content
    var name = document.getElementById("contactForm").elements["name"].value;
    var email = document.getElementById("contactForm").elements["email"].value;
    var msg_subject =  document.getElementById("contactForm").elements["subject"].value;
    var message = document.getElementById("contactForm").elements["message"].value;


    $.ajax({
        type: "POST",
        url: "assets/php/form-process.php",
        data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}