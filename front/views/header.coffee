
class Header extends Backbone.View

    ui:
        anchor: $('#header')

    template: _.template $('#header-template').html()

    render: ->
        @ui.anchor.html @template
            pages: window.app.pages


module.exports = Header
