
//var remoteServiceName = 'http://localhost:8888/rest/add/';
var remoteServiceName = 'http://bookyrestful.appspot.com/rest/add/';
// get the currently selected text
var desc;
try {
    desc= ((window.getSelection && window.getSelection()) ||
(document.getSelection && document.getSelection()) ||
(document.selection &&
document.selection.createRange &&
document.selection.createRange().text));
}
catch(e){ // access denied on https sites
    desc = "";
}

//var url= encodeURIComponent(location.href);
//var title= encodeURIComponent(document.title);

var url = location.href;
var title = document.title;
var description = desc.toString() || "";

//  $.Deferred(function (deferredObject) {

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: remoteServiceName,
            dataType: "json",
            data: JSON.stringify({ "title": title, "url": url, "description": description }),
            crossDomain:    true
            //Ajax promises
        }).done(function (data) {
  //          deferredObject.resolve(data);
        }
        ).fail(function (jqXHR, textStatus) {
            alert('Error adding bookmark! ' + textStatus);
            deferredObject.reject();
        }
        );
   // }
   // ).promise();