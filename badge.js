chrome.browserAction.onClicked.addListener(function(tabs) {
  chrome.tabs.create({
    url: 'http://divinityoriginalsin2.wiki.fextralife.com/Skills'
  });
});
