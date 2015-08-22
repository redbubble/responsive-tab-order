var ResponsiveTabOrder = (function (module) {

  var documentTabOrder = 'document';
  var visualTabOrder = 'visual';

  var defaultSameRowTolerance = 16;


  var startAutoUpdate = function (sameRowTolerance) {
    var resizeTimer;

    updateTabOrder(sameRowTolerance);
    
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { updateTabOrder(sameRowTolerance); }, 250);
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
    var tabbableElements = document.querySelectorAll('[data-taborder]');
    var tabbables = [];
    var i;

    for (i = 0; i < tabbableElements.length; ++i) {
      tabbables.push({ element: tabbableElements[i], index: i });
    }

    return tabbables;
  };

  var tabOrderComparator = function (sameRowTolerance) {
    return function (a, b) {
      var boundA = a.element.getBoundingClientRect();
      var boundB = b.element.getBoundingClientRect();
      var topDiff = boundA.top - boundB.top;
      var bottomDiff = boundA.bottom - boundB.bottom;

      if (isDocumentTabOrder(a.element) && isDocumentTabOrder(b.element)) {
        return a.index - b.index;
      }

      if (onSameRow(topDiff, bottomDiff, sameRowTolerance)) {
        return boundA.left - boundB.left;
      }

      return topDiff;
    };
  };

  var isDocumentTabOrder = function (element) {
    var tabOrder = element.attributes['data-taborder'];
    return tabOrder === '' || tabOrder === documentTabOrder;
  };

  var onSameRow = function (topDiff, bottomDiff, sameRowTolerance) {
      return (topDiff <= sameRowTolerance && bottomDiff >= -sameRowTolerance) ||
        (topDiff >= -sameRowTolerance && bottomDiff <= sameRowTolerance);
  };



  if (!module) {
    module = {
      startAutoUpdate: startAutoUpdate,
      updateTabOrder: updateTabOrder
    };

    if (typeof define === 'function' && define.amd) {
      define('responsive-tab-order', [], function () {
        return module;
      });
    }
  }

  return module;

})(ResponsiveTabOrder);
