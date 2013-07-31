/*
 * jQuery whenAll: A ajax-callback when all ajax-calls have finished
 * @author David Hainzl, http://dhainzl.at
 * @date 2013-07-30
 * @version 1.0
 * @license Licensed under the MIT license, http://opensource.org/licenses/MIT
 */
/*jslint devel: true */
/*global $ */
(function ($) {
    "use strict";

    $.whenAll = function (requests, success, error) {
        var normalizedRequests, defer,
            getNormalizedRequests = function (unnormalizedRequests) {
                var i, length = unnormalizedRequests.length, command, allNormalizedRequests = [];
                for (i = 0; i < length; i += 1) {
                    if ($.isFunction(unnormalizedRequests[i])) {
                        command = unnormalizedRequests[i]();
                    } else {
                        command = unnormalizedRequests[i];
                    }

                    allNormalizedRequests.push($.ajax(command));
                }

                return allNormalizedRequests;
            };
        if (requests && $.isArray(requests)) {
            normalizedRequests = getNormalizedRequests(requests);
            defer = $.when.apply($, normalizedRequests);
            defer.then(function () {
                if (success && $.isFunction(success)) {
                    if (normalizedRequests.length === 1) {
                        success([arguments]);
                    } else {
                        success(arguments);
                    }
                }
            }, function () {
                if (error && $.isFunction(error)) {
                    error(arguments);
                }
            });
        } else {
            if (console && console.error) {
                console.error('jQuery.whenAll error: One or more parameters are wrong!');
            }
        }
    };
}($));