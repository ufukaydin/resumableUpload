var inter,durum = true;
 
jQuery.fn.extend({
 
    Stop: function (params) {
      
        durum = false;
        req.abort();
        clearInterval(inter);
        $(this).attr("class","play");
        $(this).attr("onclick", "$(this).prev().Baslat(" +JSON.stringify(params) + ")");
    }
    , Yukle: function (params) {
    
        $(this).change(function () {
          
            $(this).Baslat(params);
        });
      

    }
    , Baslat: function (params)
    {
        durum = true;
        var defaults = {
            url: "",
            BYTES_PER_CHUNK: 200000,
            start: 0,
            ran :0
        };
        params = $.extend(defaults, params);
        var blob = $(this)[0].files[0];
        var req1 = new XMLHttpRequest();
        req1.open('POST', params.url, false);
        req1.setRequestHeader("filename", blob.name);
        req1.setRequestHeader("filesize", blob.size);
        req1.setRequestHeader("filedate", blob.lastModified);
        req1.setRequestHeader("isResume", true);
        req1.onload = function (e) { 
            params.start = parseInt(e.target.responseText);
           
        }; 
        req1.send();
      

        if (params.start == 0)
        {
            var ran = Math.floor((Math.random() * 10000) + 1);
            params.ran = ran;
        $(this).after("<a class='stop'  id='stopper_" + ran + "'  onclick='$(this).Stop("+JSON.stringify(params)+")'> </a><progress id='progressbar_" + ran + "' value='0' max='100'></progress><span id='progressbarvalue_" + ran + "'>0%</span>");
        }
        else {
            if ($("#stopper_" + params.ran).length > 0) {
                $("#stopper_" + params.ran).attr("class", "stop");
                $("#stopper_" + params.ran).attr("onclick", "$(this).Stop(" + JSON.stringify(params) + ")");
            }
            else
            {
                var ran = Math.floor((Math.random() * 10000) + 1);
                params.ran = ran;
                $(this).after("<a class='stop'  id='stopper_" + ran + "'  onclick='$(this).Stop(" + JSON.stringify(params) + ")'> </a><progress id='progressbar_" + ran + "' value='0' max='100'></progress><span id='progressbarvalue_" + ran + "'>0%</span>");
            }
           
        }
        var upload,
            chooseFile;
        var SIZE, end;
       
        SIZE = blob.size;
        end = params.start + params.BYTES_PER_CHUNK;
        req = new XMLHttpRequest();
        inter = setInterval(function () {
            if (params.start < SIZE) {
                if (durum) {
                    var blobOrFile = blob.slice(params.start, end);
                    req.open('POST', params.url, false);
                    req.setRequestHeader("filename", blob.name);
                    req.setRequestHeader("isResume", false);
                    req.onload = function (e) {
                        if (e.target.statusText == "OK") {
                            durum = true;
                        }
                    };

                    params.start = end;
                    end = params.start + params.BYTES_PER_CHUNK; 
                    var rang = (end / SIZE) * 100;
                    $("#progressbar_" + params.ran).val(rang);
                    $("#progressbarvalue_" + params.ran).text(" " + parseInt(rang) + "%");
                    durum = false;
                
                    req.send(blobOrFile);
                }
            }

        }, 1);


    }
});