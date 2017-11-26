$(function () {
//  var buildingNameHtml = '<p id=\'building-name\'>Building Name<br>' +
//      '<input type=\'text\' name=\'buildingName\'></p>';

  $('#housing-type-select').change(function() {
    if ($(this).val() === 'House')
      $('#building-name').remove();
    else if ($(this).val() === 'Apartment Building') {
      if ($('#building-name').length == 0) {
        $('#beds-paragraph').before('<p id=\'building-name\'>Building Name:</p>');
        $('#building-name').append('<input type=\'text\' name=\'buildingName\'>');
      }
    }
  });
});
