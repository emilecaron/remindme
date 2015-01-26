
class Page extends Backbone.View

    title: 'undefined_page'

    render: ->
        # Simple page
        console.log @model
        if @model.get('html')
            @$el.html @model.get('html')
        console.log 'nothing to render', @


module.exports = Page
