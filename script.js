/* Add your script here */
$('#list-btn').click(function(){
    $.ajax({
        method: 'GET',
        url: 'http://skeleton.mernbook.com/api/users'
    }).done(function(response){
        console.log(response)
        response.forEach(element => {
            let user = $('<p></p>').text(element.name)
            $('#users').append(user)
        });
    }).fail(function(response){
        console.log(response)
    })
})

$('.btn-add').click(function(){
    let user = {name:'',email:'',password:''}
    user.name = $('#input-name').val()
    user.email = $('#input-email').val()
    user.password = $('#input-password').val()

    $.ajax({
        method: 'POST',
        url: 'http://skeleton.mernbook.com/api/users',
        data: user
    }).done(function(response){
        console.log(response)
        $('#input-name').val('')
        $('#input-email').val('')
        $('#input-password').val('')
        $('#error').css("color", "blue");
        $('#error').text(response.message)
    }).fail(function(response){
        $('#error').text(response.responseJSON.error)
    })
})