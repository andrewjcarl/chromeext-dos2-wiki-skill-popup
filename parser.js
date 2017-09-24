let $ = window.jQuery;
let store = window.localStorage;
let skills = $('.col-sm-2 > h4 > a.wiki_link');

function loadFromCache(url) {
  let popup = store.getItem(btoa(url));
  if (!popup) return false;
  console.log(`[divinity-2-helper] loading html from cache for ${url}`);
  render($.parseHTML(popup));
  return true;
}

function render(popup) {
  $(popup).css({
    'position'  : 'fixed',
    'left:'     : '10px',
    'bottom'    : '10px',
    'background': 'rgba(0,0,0,.95)'
  });
  $('html').append(popup);
}

function toggle() {
  let url = $(this).attr('href');

  if (!loadFromCache(url)) {
    $.get(url, function(data) {
      let popup = $(data).find('#infobox').clone();
      //  cache for later
      store.setItem(btoa(url), popup[0].outerHTML);
      render(popup);
    });
  }
}

function dismiss() {
  $('#infobox').remove();
}

$.each(skills, function(i, skill) {
  $(skill).hoverIntent(toggle, dismiss);
});
