
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

        console.log 'good', @
        window.app.pages.forEach (page) ->
           linkView = new PageLinkView
                model: page
           _el.append linkView.render().el


class PageLinkView extends Backbone.View
    tagName: 'li'

    events:
        'click': 'onClick'

    render: ->
        @$el.html "<a>" + @model.get('title') + "</a>"
        console.log 'yolo', window.app.activePage(), @model
        if @model == window.app.activePage()
            console.log 'yes'
            @$el.addClass 'active'
        @

    onClick: ->
        Backbone.trigger 'changePage', @model



module.exports = Header
