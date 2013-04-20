define(function () {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    //Production server
    var remoteServiceName = 'http://bookyrestful.appspot.com/rest/bookmarks/';
    
    //Dev server
    //var remoteServiceName = 'http://localhost:8888/rest/bookmarks/';
    
    var isJavaWebService = true;
    var routes =
    [
    
     //---------------------------------------
     //Bookmark Listing   
     //---------------------------------------
    {
        url: 'bookmarks',
        moduleId: 'viewmodels/bookmarks',
        name: 'Bookmarks',
        visible: true,
        caption: '<i class="icon-book"></i> Bookmarks'
    }
    
     ,
     //---------------------------------------
     //Edit Bookmark/Bookmark Detail   
     //---------------------------------------   
     {
         url: 'bookmarkdetail/:id',
         moduleId: 'viewmodels/bookmarkdetail',
         name: 'Edit Bookmark',
         visible: false
     }

     //---------------------------------------
     //Add Bookmark   
     //---------------------------------------   

    ,
    {
        url: 'bookmarkadd',
        moduleId: 'viewmodels/bookmarkadd',
        name: 'Add Bookmark',
        visible: false,
        caption: 'Add Bookmark'
    }
   
    ];
    
    var startModule = 'bookmarks';

    return {
        debugEnabled: ko.observable(true),
        remoteServiceName: remoteServiceName,
        routes: routes,
        startModule: startModule
    };
});