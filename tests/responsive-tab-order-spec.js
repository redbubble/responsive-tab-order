describe('ResponsiveTabOrder', function () {

  var tabIndexFor = function (selector) {
    return document.querySelector(selector).tabIndex;
  };


  describe('updateTabOrder', function () {

    describe('for visual ordering', function () {

      describe('with zero same-row tolerance', function () {

        beforeAll(function () {
          ResponsiveTabOrder.updateTabOrder(0);
        });

        it('gives a lower tabindex to topmost elements regardless of their order in the DOM', function () {
          expect(tabIndexFor('[data-high-div-1][data-taborder="visual"]')).toBeLessThan(tabIndexFor('[data-low-div-1][data-taborder="visual"]'));
          expect(tabIndexFor('[data-high-div-2][data-taborder="visual"]')).toBeLessThan(tabIndexFor('[data-low-div-2][data-taborder="visual"]'));
          expect(tabIndexFor('[data-medium-div-1][data-taborder="visual"]')).toBeLessThan(tabIndexFor('[data-low-div-1][data-taborder="visual"]'));
        });

        it('gives a lower tabindex to leftmost elements regardless of their order in the DOM', function () {
          expect(tabIndexFor('[data-low-div-1][data-taborder="visual"]')).toBeLessThan(tabIndexFor('[data-low-div-2][data-taborder="visual"]'));
          expect(tabIndexFor('[data-high-div-1][data-taborder="visual"]')).toBeLessThan(tabIndexFor('[data-high-div-2][data-taborder="visual"]'));
        });

        it('treats elements as being on the same row if one falls within the vertical bounds of the other', function () {
          expect(tabIndexFor('[data-tall-div-1][data-taborder="visual"]')).toBeLessThan(tabIndexFor('[data-high-div-2][data-taborder="visual"]'));
          expect(tabIndexFor('[data-tall-div-2][data-taborder="visual"]')).toBeLessThan(tabIndexFor('[data-low-div-2][data-taborder="visual"]'));
        });

      });

      describe('with some same-row tolerance', function () {

        beforeAll(function () {
          ResponsiveTabOrder.updateTabOrder(10);
        });

        it('treats elements as being on the same row if one falls within the vertical bounds of the other, within tolerance', function () {
          expect(tabIndexFor('[data-tall-div-2][data-taborder="visual"]')).toBeLessThan(tabIndexFor('[data-low-div-2][data-taborder="visual"]'));
          expect(tabIndexFor('[data-low-div-2][data-taborder="visual"]')).toBeLessThan(tabIndexFor('[data-medium-div-1][data-taborder="visual"]'));
        });

      });
    });

    describe('for document ordering', function () {

      it('treats elements with empty data-taborder as document order', function () {
        expect(tabIndexFor('[data-low-div-3][data-taborder=""]')).toBeLessThan(tabIndexFor('[data-high-div-3][data-taborder=""]'));
      });
    });
  });
});