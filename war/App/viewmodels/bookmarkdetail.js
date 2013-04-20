define(['services/dataservice',
        'durandal/plugins/router',
        'durandal/system',
        'durandal/app',
        'services/logger'],
    function (dataservice, router, system, app, logger) {
        var bookmark = ko.observable();
       
        var isSaving = ko.observable(false);
        var isDeleting = ko.observable(false);

        var activate = function (routeData) {
            var id = parseInt(routeData.id);
         
            return dataservice.getBookmarkById(id, bookmark);
        };

        var goBack = function () {
            router.navigateBack();
        };

        var hasChanges = ko.computed(function() {
            return true;
            //return dataservice.hasChanges();
        });

        var cancel = function() {
            //dataservice.cancelChanges();
        };

        var canSave = ko.computed(function() {

            return true;
            //return hasChanges() && !isSaving();
        });
        
        var save = function () {
            isSaving(true);

            return dataservice.updateBookmark(bookmark).then(complete);
            
            function complete() {
                isSaving(false);
                router.navigateTo('#/bookmarks');
            }
        };

        var deleteBookmark = function() {
            var msg = 'Delete bookmark "' + bookmark().title() + '" ?';
            var title = 'Confirm Delete';
            isDeleting(true);
            return app.showMessage(msg, title, ['Yes', 'No'])
                .then(confirmDelete);
            
            function confirmDelete(selectedOption) {
                if (selectedOption === 'Yes') {
                    
                	//Create an unmapped javascript object from the ko obvservable and pass this to the dataservice
                    var unmappedBookmark = ko.toJS(bookmark);
                	
                	dataservice.deleteBookmark(unmappedBookmark).then(success); //.always(finish);
                    
                    //save().then(success).fail(failed).then(finish);
                    
                    function success() {
                        router.navigateTo('#/bookmarks');
                    }
                    
                    function failed(error) {
                        cancel();
                        var errorMsg = 'Error: ' + error.message;
                        logger.logError(
                            errorMsg, error, system.getModuleId(vm), true);
                    }
                    
                    function finish() {
                        return selectedOption;
                    }
                }
                isDeleting(false);
            }
        };

        var canDeactivate = function () {
            if (isDeleting()) { return false; }

            if (hasChanges()) {
                var title = 'Do you want to leave "' +
                    bookmark().title() + '" ?';
                var msg = 'Navigate away and cancel your changes?';
                return app.showMessage(title, msg, ['Yes', 'No'])
                    .then(confirm);
                
                function confirm(selectedOption)
                {
                    if (selectedOption === 'Yes') {
                        cancel();
                    }
                    return selectedOption;
                }
            }
            return true;
        };

        var vm = {
            activate: activate,
            cancel: cancel,
            //canDeactivate: canDeactivate,
            canSave: canSave,
            deleteBookmark: deleteBookmark,
            goBack: goBack,
            hasChanges: hasChanges,
            save: save,
            bookmark: bookmark,
            title: 'Bookmark Details'
        };
        return vm;
    });