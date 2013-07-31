$(document).ready(function () {
    var c = {};
    c.log = function (text) {
        if (console && console.log) console.log (text);
        $('#console').append('<div class="message">' + text + '</div>');
    };
    doWhenAll = function (pages) {
        $.whenAll (pages, function (results) {
            c.log ('loaded ' + results.length + ' pages!');
            console.dir (results);
        });
    }
    
    $('#demo_1').click(function () {
        var pages = [
            'example1.json',
            function () { return 'example1.json'; },
            { url: 'example1.json', success: function () { c.log ('loaded 3'); } },
            function () { return { url: 'https://api.trustyou.com/hotels/d8421e79-99f0-41b2-8d6e-9cfd62a9776b/reviews.json?lang_list=[%22de%22]&page_size=10', dataType: 'jsonp', success: function () { c.log ('loaded from trustyou'); } }; }
        ];
        doWhenAll(pages);
    });
    
    $('#demo_2').click(function () {
        var pages = [
            'example1.json'
        ];
        doWhenAll(pages);
    });
    $('#demo_3').click(function () {
        var pages = $('#demo_3_text').val().split('\n');
        doWhenAll(pages);
    });
});