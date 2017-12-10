$(function () {
  var base = window.location.protocol + '//' + window.location.host;
  console.log(base);
  $('.post-button').on('click', function (e) {
    window.location.assign(base + '/create/');
  });
  $('.view-button').on('click', function (e) {
    var id = $(this).attr('data-listing-id');
    window.location.assign(base + '/view/' + id);
  });
  $('.search-button').on('click', function (e) {
    window.location.assign(base + '/search/');
  });
});
