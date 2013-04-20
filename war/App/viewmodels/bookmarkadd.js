define(['durandal/app', 'services/dataservice', 'durandal/plugins/router','services/model'],
    function (app, dataservice, router,model) {
        var isSaving = ko.observable(false),
            
            bookmark = ko.observable(),
            
            activate = function () {
                bookmark(model.BookmarkItem());
                

            },
            cancel = function (complete) {
                router.navigateBack();
            },
          
            save = function () {
                isSaving(true);
                
                //Create an unmapped javascript object from the ko obvservable and pass this to the dataservice
                var unmappedBookmark = ko.toJS(bookmark);

                dataservice.addBookmark(unmappedBookmark).then(goToEditView).always(complete);

                function goToEditView(result) {
                    //Update our bookmark observable with the dataservice result
                    bookmark(result);
                    router.replaceLocation('#/bookmarkdetail/' + result.id );
                }

                function complete() {
                    isSaving(false);
                }
            },
            canDeactivate = function () {
                if (hasChanges()) {
                    var msg = 'Do you want to leave and cancel?';
                    return app.showMessage(msg, 'Navigate Away', ['Yes', 'No'])
                        .then(function (selectedOption) {
                            if (selectedOption === 'Yes') {
                                dataservice.cancelChanges();
                            }
                            return selectedOption;
                        });
                }
                return true;
            };

        var vm = {
            activate: activate,
           // canDeactivate: canDeactivate,
            cancel: cancel,
            save: save,
            bookmark: bookmark,
            title: 'Add a New Bookmark'
           
        };

        return vm;
    });