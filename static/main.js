submitRequest = function( req_obj, api_call ) {
    $.ajax({
        type: "POST",
        url: "/" + api_call,
        data: {"text": req_obj},
        beforeSend: function ( ) {
            //remove the previous results and disable the submit button
            $('#results').empty();
            $("#submitButton").bind('click', false);
        },
        success:function(result) {
            //get the list from the result
            var list = result["word_list"];
            //add result title element
            if (list.length > 0) {
                $('#results').append($('<div/>', {
                                            id: "result_title",
                                            class: 'center result_title',
                                            html: "Gaze upon the magical results:"
                                    }));
            }
            //add each result element
            for (var i = 0; i < list.length; i++) {
                if (list[i].length == 2) {
                    var new_word_div = $('<div/>', {
                                            id: "word" + list[i][0],
                                            class: 'center results',
                                            html: "'" + list[i][0] + "' appeared " + list[i][1] + " time(s)."
                                        });
                    $('#results').append(new_word_div);
                }
            }
            //re-enable submit
            $("#submitButton").unbind('click', false);
        },
        error:function() {
            //show error alert and re-enable submit
            alert("The minions have made a mistake! Please try again.");
            $("#submitButton").unbind('click', false);
        }
    });
}

submitText = function( ) {
    input_text = $("#text_input").val();
    submitRequest( input_text, "");
}
