submitRequest = function( req_obj, api_call ) {
    $.ajax({
        type: "POST",
        url: "/" + api_call,
        data: {"text": req_obj},
        beforeSend: function ( ) {
            //remove the previous results and disable the submit button
            $('#results').empty();
            $("#submitButton").attr("disabled", "disabled");
        },
        success:function(result) {
            var list = result["word_dict"];
            for (var key in list) {
                // check to see if key is owned by list object and not by any of it's ancestors
                if (list.hasOwnProperty(key)) { 
                    var x = $('<div/>', {
                                id: "word" + key,
                                className: 'foobar',
                                html: key+': '+list[key]
                            });
                    $('#results').append(x);
                }
            }
            $("#submitButton").removeAttr("disabled");
        },
        error:function() {
            //alert("failure");
            $("#submitButton").removeAttr("disabled");
        }
    });
}

submitText = function( ) {
    input_text = $("#text_input").val();
    submitRequest( input_text, "");
}
