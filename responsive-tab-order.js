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
    var tabbables = findTabbables();
    var i;

    if (typeof(sameRowTolerance) !== 'number') {
      sameRowTolerance = defaultSameRowTolerance;
    }

    tabbables.sort(tabOrderComparator(sameRowTolerance));

    for (i = 0; i < tabbables.length; ++i) {
      tabbables[i].element.tabIndex = i + 1;
    }
  };


  var findTabbables = function () {
    var tabbableElements = $('[data-taborder]').get();
    var tabbables = [];
    var i;

    for (i = 0; i < tabbableElements.length; ++i) {
      tabbables.push({ element: tabbableElements[i], index: i });
    }

    return tabbables;
  };

  var isDocumentTabOrder = function (element) {
    var tabOrder = $(element).attr('data-taborder');
    return tabOrder === '' || tabOrder === documentTabOrder;
  };

  var onSameRow = function (topDiff, bottomDiff, sameRowTolerance) {
      return (topDiff <= sameRowTolerance && bottomDiff >= -sameRowTolerance) ||
        (topDiff >= -sameRowTolerance && bottomDiff <= sameRowTolerance);
  };

  var tabOrderComparator = function (sameRowTolerance) {
    return function (a, b) {
      var offsetA = $(a.element).offset();
      var offsetB = $(b.element).offset();
      var topDiff = offsetA.top - offsetB.top;
      var bottomDiff = (offsetA.top + $(a.element).height()) - (offsetB.top + $(b.element).height());

      if (isDocumentTabOrder(a.element) && isDocumentTabOrder(b.element)) {
        return a.index - b.index;
      }

      if (onSameRow(topDiff, bottomDiff, sameRowTolerance)) {
        return offsetA.left - offsetB.left;
      }

      return topDiff;
    };
  };


  var module = {
    startAutoUpdate: startAutoUpdate,
    updateTabOrder: updateTabOrder
  };

  return module;
});