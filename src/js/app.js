var webAppCore = function($) {

    function sendQuery(intitle, callback) {
        $.ajax({
            url:  'modules/query.jsp?intitle=' + intitle,
            success: function(data) {
                var json = JSON.parse(data || '');

                var rows = [];

                if(json['items'] && json['items'].length > 0) {

                    json['items'].forEach(function(item) {

                        var isAnswered = item['is_answered'].toString() === 'true';

                        var row = $.parseHTML('<tr><td>' +
                            '<a href=\"' + item['link'] + '\">' + item['title'] + '</a>' +
                            '</td>' +
                            '<td data-sort-key=\"' + item['creation_date'] + '\">' + new Date(item['creation_date'] * 1000).toLocaleString() + '</td>' +
                            '<td>' +
                            '<a href=\"' + item['owner']['link'] + '\">' + item['owner']['display_name'] + '</a>' +
                            '</td>' +
                            '<td class="text-center solution-mark" data-sort-key=\"' + (isAnswered ? '1' : '0') + '\">' + (
                                isAnswered ?
                                    '<span class=\"fa fa-check answered\"></span>' :
                                    '<span class=\"fa fa-question not-answered\"></span>'
                            ) +
                            '</td></tr>');

                        rows.push(row[0]);

                    });

                    $('#row-counter').text(rows.length);

                } else {
                    var row = $.parseHTML('<tr><td colspan=\"4\">No records...</td></tr>');
                    rows.push(row[0]);
                    $('#row-counter').text(0);
                }

                callback(rows);
            }
        });
    }

    return {
        sendQuery: sendQuery
    };

}(jQuery);