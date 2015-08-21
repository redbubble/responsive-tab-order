define('responsive-tab-order', [ 'jquery' ], function ($) {
  var documentTabOrder = 'document';
  var visualTabOrder = 'visual';

  var defaultSameRowTolerance = 16;


  var startAutoUpdate = function (sameRowTolerance) {
    var resizeTimer;

    updateTabOrder(sameRowTolerance);
    
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { updateTabOrder(sameRowTolerance); }, 500);
    });
  };

  var updateTabOrder = function (sameRowTolerance) {
    var tabbables = $('[data-taborder]').get();
    var i;

    if (typeof(sameRowTolerance) !== 'number') {
      sameRowTolerance = defaultSameRowTolerance;
    }

    tabbables.sort(function (a, b) {
      var offsetA = $(a).offset();
      var offsetB = $(b).offset();
      var topDiff = offsetA.top - offsetB.top;
      var bottomDiff = (offsetA.top + $(a).height()) - (offsetB.top + $(b).height());

      if (isDocumentTabOrder($(a).attr('data-taborder')) && isDocumentTabOrder($(b).attr('data-taborder'))) {
        return tabbables.indexOf(a) < tabbables.indexOf(b) ? -1 : 1;
      }

      if ((topDiff <= sameRowTolerance && bottomDiff >= -sameRowTolerance) ||
          (topDiff >= -sameRowTolerance && bottomDiff <= sameRowTolerance))
      {
        return offsetA.left - offsetB.left;
      }

      return topDiff;
    });

    for (i = 0; i < tabbables.length; ++i) {
      tabbables[i].tabIndex = i + 1;
    }
  };


  var isDocumentTabOrder = function (tabOrder) {
    return tabOrder === '' || tabOrder === documentTabOrder;
  };


  var module = {
    startAutoUpdate: startAutoUpdate,
    updateTabOrder: updateTabOrder
  };

  return module;
});