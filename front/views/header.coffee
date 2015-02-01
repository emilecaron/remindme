
class Header extends Backbone.View

    el: '#header'

    ui:
        links: '#header-links'

    template: _.template $('#header-template').html()

    initialize: (options)->
        @pages = options.pages

    render: ->
        # Avoid losing fb_button html
        @fb_html = $('.fb-share-button').html() if not @fg
        @$el.html @template
        $('.fb-share-button').html(@fb_html)
        @renderLinks()

    renderLinks: ->
        _el = $ @ui.links
        _el.html ''

        activePage = @pages.active
        @pages.forEach (page) ->
           linkView = new PageLinkView
                model: page
                isActive: page == activePage
           _el.append linkView.render().el


class PageLinkView extends Backbone.View
    tagName: 'li'

    events:
        'click': 'onClick'

    initialize: (options)->
        @options = options

    render: ->
        @$el.html "<a>" + @model.get('title') + "</a>"
        @$el.addClass 'active' if @options.isActive
        @

    onClick: ->
        Backbone.trigger 'changePage', @model



module.exports = Header
