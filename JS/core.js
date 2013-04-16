/**
 * @title        Core Class - A Javascript class with an array of useful methods
 * @author       Michael Aguiar <mike@aliasproject.com>
 * @copyright    2013 Alias Project, Inc.
 */

function Core()
{
	var error = 0;

    this.ajax = function (ajaxType, ajaxURL, data, dataType, callback, async)
    {
        var ajaxResponse, 
        	success,
        	async = (!async) ? false : async;
        
        $.ajax({
            type: ajaxType,
            async: async,
            url: ajaxURL,
            data: data,
            dataType: dataType,
            timeout: 5000,
            success: function(response) {
                ajaxResponse = response;
            	if (ajaxResponse.error) {
            		if(error === 0) {
            	    	// RTTOT
            	    }
            	} else {
            		success = true;
            	}
            },
            complete: function(xmlHttp) {
               	if (xmlHttp.status === 401) {
                    window.location = location.protocol + '//' + location.host;
                }
                
                if (success && callback !== '') {
                	callback(ajaxResponse);
                }
            },
            error: function(request, error) {
            	// ERROR
            }
        });
    };
    
    this.debug = function(msg)
    {
		if (window.console && window.console.log) {
			console.log(msg);
		}
		return;
    }
    
    this.isRetina = function()
    {
		return (window.devicePixelRatio >= 2) ? true : false;
	}
    
    this.round_number = function(num, dec)
    {
    	return Math.round(num * Math.pow(10,dec)) / Math.pow(10,dec);
    }
        
    this.add_comma = function(num)
    {
	    num += '';
	    var x = num.split('.'),
	    	x1 = x[0],
	    	x2 = x.length > 1 ? '.' + x[1] : '',
	    	rgx = /(\d+)(\d{3})/;
	    
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    
	    return x1 + x2;
    }
    
    this.format_currency = function(num)
    {
		num -= 0;
		num = (Math.round(num*100))/100;
    	return Core.add_comma((num == Math.floor(num)) ? num + '.00' : ( (num*10 == Math.floor(num*10)) ? num + '0' : num));
    }
    
    this.make_query = function(arr)
    {
	    var s = '';
	    
	    for (var e in arr) {
	       s += '&' + e + '=' + escape(arr[e]);
	    }
	    
	    return s.substring(1);
    }
}
var Core = new Core();