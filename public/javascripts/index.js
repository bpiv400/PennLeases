/*
 * Adds event listeners for buttons on the welcome page
 */
$(function () {
  $('.post-button').on('click', function(e) {
    window.location.assign(window.location.href + 'create/');
  });
  $('.view-button').on('click', function(e) {
    window.location.assign(window.location.href + 'search/');
  });
});
