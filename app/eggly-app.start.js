angular.module('Eggly', [
    'ui.router',
    'categories',
    'categories.bookmarks'

])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('eggly', {
            url:'',
            abstract: true
        })
    ;

    $urlRouterProvider.otherwise('/');
})
.controller('MainCtrl', function($scope, $state) {
    $scope.currentCategory = null;

    function isCurrentCategory(category) {
        return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
    }

    function setCurrentCategory(category) {
        $scope.currentCategory = category;

        //$state.go('', {category:category.name});

        cancelEditing();
        cancelCreating();
    }

    $scope.setCurrentCategory = setCurrentCategory;
    $scope.isCurrentCategory = isCurrentCategory;

    // CRUD
    function resetCreateForm() {
        $scope.newBookmark = {
            title: '',
            url: '',
            category: $scope.currentCategory
        }
    }

    function createBookmark(bookmark) {
        bookmark.id = $scope.bookmarks.length;
        $scope.bookmarks.push(bookmark);

        resetCreateForm();
    }

    $scope.createBookmark = createBookmark;

    $scope.editedBookmark = null;

    function setEditedBookmark(bookmark) {
        $scope.editedBookmark = angular.copy(bookmark);
    }

    function updateBookmark(bookmark) {
        var index = _.findIndex($scope.bookmarks, function(b) {
            return b.id == bookmark.id;
        });

        $scope.bookmarks[index] = bookmark;
        $scope.editedBookmark = null;
        $scope.isEditing = false;
    }

    function isSelectedBookmark(bookmarkId) {
        return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
    }

    $scope.setEditedBookmark = setEditedBookmark;
    $scope.updateBookmark = updateBookmark;
    $scope.isSelectedBookmark = isSelectedBookmark;

    function deleteBookmark(bookmark) {
        _.remove($scope.bookmarks, function(b) {
            return b.id == bookmark.id;
        });
    }

    $scope.deleteBookmark = deleteBookmark;

    //create and edit
    $scope.isCreating = false;
    $scope.isEditing = false;

    function startCreating() {
        $scope.isCreating = true;
        $scope.isEditing = false;

        resetCreateForm();
    }

    function cancelCreating() {
        $scope.isCreating = false;
    }

    function startEditing() {
        $scope.isCreating = false;
        $scope.isEditing = true;
    }

    function cancelEditing() {
        $scope.isEditing = false;
    }

    function shouldShowCreating() {
        return $scope.currentCategory && !$scope.isEditing;
    }

    function shouldShowEditing() {
        return $scope.isEditing && !$scope.isCreating;
    }

    $scope.startCreating = startCreating;
    $scope.cancelCreating = cancelCreating;
    $scope.startEditing = startEditing;
    $scope.cancelEditing = cancelEditing;
    $scope.shouldShowCreating = shouldShowCreating;
    $scope.shouldShowEditing = shouldShowEditing;

})
;