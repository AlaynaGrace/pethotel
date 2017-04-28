console.log('js is running');

$(function(){
console.log('jq is running');
// event listeners
  $('#register').on('click', registerFunc);
  $('#add').on('click', addFunc);
  $(document).on('click', '#update', updateFunc);
  $(document).on('click', '#delete', deleteFunc);
  //$('.container').on('click', '#in', inFunc);
  //$('.container').on('click', '#out', outFunc);

  getPets();
  getOwners();
});

function getOwners(){
  $.ajax({
    url: '/pets',
    method: 'GET',
    success: function(response){
      console.log('getOwners',response);
      var ownerArray = [];
      for (var i = 0; i< response.length; i++) {
        var full = response[i].owner_first.toString() + " " + response[i].owner_last.toString();
        console.log(full);
        ownerArray.push(full);
      }
      console.log('ownerArray',ownerArray);
      ownerArray = $.unique(ownerArray);
      console.log('Unique array',ownerArray);

      for(var i = 0; i<ownerArray.length; i++){
        $('#owners').append('<option>' + ownerArray[i] + '</option>');
      }


    }
  });
}

function getPets(){
  $.ajax({
    url: '/pets',
    method: 'GET',
    success: function(response){
      $('.container').empty();
      console.log(response);
      for(var i=0; i<response.length; i++){
        if( response[i].pet_name !== null){
          var appendString = '';
          appendString+='<div class="row"><tr class="container"><td>'+ response[i].owner_first + ' ' + response[i].owner_last +'</td>';
          appendString+='<td><input type="text" id="nameOfPet" name="" value="'+ response[i].pet_name +'"></td>';
          appendString+='<td><input type="text" id="breedOfPet" name="" value="'+ response[i].breed +'"></td>';
          appendString+='<td><input type="text" id="colorOfPet" name="" value="'+ response[i].color + '"></td>';
          appendString+='<td><button data-petid= "' + response[i].id + '" id="update">Update</button></td>';
          appendString+='<td><button data-petid="'+ response[i].id +'" id="delete">Delete</button></td>';
          appendString+='<td><button id="in">In</button></td></tr></div>';
          $('.table').append(appendString);
        }
      }
    }
  });
}

function registerFunc(){
  var objectToSend = {
    firstName: $('#first-name').val(),
    lastName: $('#last-name').val()
  };
  $.ajax({
    url: '/register',
    type: 'POST',
    data: objectToSend,
    success: function(goPiddle){
      console.log(goPiddle);
      $('#owners').append('<option>'+ objectToSend.firstName + " " + objectToSend.lastName + '</option>');


    }
  });
}

function addFunc(){
  var fullName = $('#owners').val().split(' ');
  var objectToSend = {
    firstName: fullName[0],
    lastName: fullName[1],
    pet: $('#pet-name').val(),
    breed: $('#breed').val(),
    color: $('#color').val()
  };
  $.ajax({
    url: '/addPet',
    type: 'POST',
    data: objectToSend,
    success: function(res){
      console.log(res);
      getPets();
      $('#pet-name').val('');
      $('#breed').val('');
      $('#color').val('');
      // $('.container').append('<tr><td>' + objectToSend.firstName + ' ' + objectToSend.lastName + '</td><td>' + objectToSend.pet + '</td><td>' + objectToSend.breed + '</td><td>' + objectToSend.color + '</td><td><button id="update">Update</button></td><td><button id="delete">Delete</button></td><td><button id="in">In</button></td></tr>');
    }
  });
}

function deleteFunc(){
  var myId = $(this).data('petid');
  console.log('id:',myId);
  $.ajax({
    url: '/delete',
    type: 'DELETE',
    data: {id: myId},
    success: function(res){
      console.log(res);
      getPets();
    }
  });
}

function updateFunc(){
  var updates = {
    id:$(this).data('petid'),
    name:$(this).parent().children('#nameOfPet').val(),
    breed:$(this).parent().children('#breedOfPet').val(),
    color:$(this).parent().children('#colorOfPet').val(),
  };
  console.log('this is updates', updates);
  console.log('jimmmaay');
  $.ajax({
    url: '/update',
    type: 'POST',
    data: updates,
    success: function(goPotty){
      console.log('go potty');
      console.log(goPotty);

    }
  });
}
