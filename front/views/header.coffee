
class Header extends Backbone.View

    el: '#header'

    ui:
        links: '#header-links'

    template: _.template $('#header-template').html()

    render: ->
        # Avoid losing fb_button html
        @fb_html = $('.fb-share-button').html() if not @fg
        
        @$el.html @template
        $('.fb-share-button').html(@fb_html)
        @renderLinks()

    renderLinks: ->
        _el = $ @ui.links
        _el.html ''

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
        if @model == window.app.activePage()
            console.log 'yes'
            @$el.addClass 'active'
        @

    onClick: ->
        Backbone.trigger 'changePage', @model



module.exports = Header
