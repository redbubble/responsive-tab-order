# responsive-tab-order

Simple JavaScript library for dynamically managing keyboard navigation order (tab order) on responsive Web pages.


## Using

`responsive-tab-order` is a [Bower](http://bower.io) package.

1. Add it to your application using:

  `bower install -S 'git@github.com:redbubble/responsive-tab-order.git#master'`

2. Add a `data-taborder` attribute to each element on your page that should receive focus. The value of the attribute can be `visual` or `document` (or blank, which is the same as `document`). When set to `visual`, an element is placed in the tab order by its visual positioning relative to other focusable elements (currently, only top-to-bottom/left-to-right is supported). When set to `document`, an element is placed in the tab order according to its position in the DOM.

3. Let `responsive-tab-order` manage the tab order by including the following on your page:

    `ResponsiveTabOrder.startAutoUpdate();`
  
  or, using [RequireJS](http://requirejs.org):
  
      require([ 'responsive-tab-order' ], function (ResponsiveTabOrder) {
        ResponsiveTabOrder.startAutoUpdate();
      });

  You can pass in a pixel distance threshold for elements to be considered "on the same line" (the default is 16):
  
    `ResponsiveTabOrder.startAutoUpdate(32);`

4. Manually trigger an update if you dynamically change the DOM and need to get your tab order straight:

    `ResponsiveTabOrder.updateTabOrder();`

  This also takes a pixel distance threshold:
  
    `ResponsiveTabOrder.updateTabOrder(32);`


## Developing

`responsive-tab-order` uses [Bower](http://bower.io) for dependency management.

1. Install dependencies: `bower install`
2. Run tests by opening `tests/SpecRunner.html`


## License

`responsive-tab-order` is released under an MIT license. See [LICENSE.txt](//github.com/redbubble/responsive-tab-order/blob/master/LICENSE.txt) for details.
