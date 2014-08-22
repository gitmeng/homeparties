'use strict';

// Filter returning published requests in a list.
angular.module('requests').filter('isPublished', function () {
    return function (items) {
        var published = [];
        for (var i=0; i < items.length; i++) {
            var item = items[i];
            if (item.published===true) {
                published.push(item);
            }
        }
        return published;
    };
});