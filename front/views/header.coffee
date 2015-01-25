
class Header extends Backbone.View

    el: '#header'

    ui:
        links: '#header-links'

    template: _.template $('#header-template').html()

    render: ->
        @$el.html @template
        @renderLinks()

    renderLinks: ->
        _el = $ @ui.links
        _el.html ''

        window.app.pages.forEach (page) ->
           linkView = new PageLinkView
                model: page
           _el.append linkView.render().el


class PageLinkView extends Backbone.View
    tagName: 'div'
    className: 'header-link header-el'

    events:
        'click': 'onClick'

    render: ->
        @$el.html @model.get 'title'
        @

    onClick: ->
        console.log 'Click', @model.get 'title'
        Backbone.trigger 'changePage', @model



module.exports = Header
