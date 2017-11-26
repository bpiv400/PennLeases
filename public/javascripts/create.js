$(function () {
//  var buildingNameHtml = '<p id=\'building-name\'>Building Name<br>' +
//      '<input type=\'text\' name=\'buildingName\'></p>';

  $('#housing-type-select').change(function() {
    if ($(this).val() === 'House')
      $('#building-name').remove();
    else if ($(this).val() === 'Apartment Building') {
      if ($('#building-name').length == 0) {
        $('#beds-paragraph').before('<div id=\'building-name\' class=\'form-group\'>Building Name:</div>');
        $('#building-name').append('<input type=\'text\' name=\'buildingName\' class=\'form-control\'>');
      }
    }
  });
  $('#zip').change(function(e) {
    var zipCode = $(this).val().trim();
    var num = new Number(zipCode);
    var int = false;
    if (num) {
      int = (num % 1) === 0;
    }
    console.log(num);
    console.log(zipCode.length);
    if (zipCode.length !== 5 || !int ||
    zipCode.charAt(zipCode.length - 1) === '.') {
      $('#zip-paragraph').removeClass('has-success');
      $('#zip-paragraph').addClass('has-error');
    } else {
      $('#zip-paragraph').removeClass('has-error');
      $('#zip-paragraph').addClass('has-success');
    }
  });
  $('#submission').on('click', function(e) {
    var zipError = $('#zip-paragraph').hasClass('has-error');
    if (zipError) {
      e.preventDefault();
    }
  });
});
