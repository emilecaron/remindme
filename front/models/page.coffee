
class Page extends Backbone.Model

    defaults:
        title: 'untitled page'
        active: false

    isActive: ->
        @get('active')



module.exports = Page
