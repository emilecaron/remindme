(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/emile/workspace/remindme/front/collections/pages.coffee":[function(require,module,exports){
var Page, Pages,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = require('../models/page.coffee');

Pages = (function(_super) {
  __extends(Pages, _super);

  function Pages() {
    return Pages.__super__.constructor.apply(this, arguments);
  }

  Pages.prototype.model = Page;

  Pages.prototype.initialize = function() {
    return Backbone.on('changePage', this.setActivePage, this);
  };

  Pages.prototype.setActivePage = function(page) {
    return this.active = page;
  };

  return Pages;

})(Backbone.Collection);

module.exports = Pages;



},{"../models/page.coffee":"/home/emile/workspace/remindme/front/models/page.coffee"}],"/home/emile/workspace/remindme/front/main.coffee":[function(require,module,exports){
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

$(function() {

  /*
  all class def must be encapsulated inside $.ready()
  otherwise templates from page.html won't be available.
   */
  var AboutPage, AppView, Header, Pages, RemindmePage, _app;
  Header = require('./views/header.coffee');
  Pages = require('./collections/pages.coffee');
  RemindmePage = require('./models/remindme_page.coffee');
  AboutPage = require('./models/about_page.coffee');
  AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.events = {
      'changePage': 'onChangePage'
    };

    AppView.prototype.initialize = function() {
      var about, remindme;
      console.log('Initializing app');
      remindme = new RemindmePage();
      about = new AboutPage();
      this.pages = new Pages([remindme, about]);
      this.header = new Header({
        pages: this.pages
      });
      this.initListener();
      return this.render();
    };

    AppView.prototype.initListener = function() {
      var app;
      app = this;
      return Backbone.on('all', function(name) {
        if (__indexOf.call(_.functions(app), name) >= 0) {
          return app[name].apply(app, arguments);
        }
      });
    };

    AppView.prototype.showFirstPage = function() {
      return Backbone.trigger('changePage', this.pages.first());
    };

    AppView.prototype.render = function() {
      this.header.render();
      Backbone.trigger('rendered');
      return this;
    };

    AppView.prototype.changePage = function(e, page) {
      page.get('view').render();
      return this.header.renderLinks();
    };

    return AppView;

  })(Backbone.View);
  _app = new AppView();
  return Backbone.trigger('showFirstPage');
});



},{"./collections/pages.coffee":"/home/emile/workspace/remindme/front/collections/pages.coffee","./models/about_page.coffee":"/home/emile/workspace/remindme/front/models/about_page.coffee","./models/remindme_page.coffee":"/home/emile/workspace/remindme/front/models/remindme_page.coffee","./views/header.coffee":"/home/emile/workspace/remindme/front/views/header.coffee"}],"/home/emile/workspace/remindme/front/models/about_page.coffee":[function(require,module,exports){
var AboutmePage, Page,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = require('./page.coffee');

AboutmePage = (function(_super) {
  __extends(AboutmePage, _super);

  function AboutmePage() {
    return AboutmePage.__super__.constructor.apply(this, arguments);
  }

  AboutmePage.prototype.defaults = function() {
    return {
      title: 'About',
      panels: {
        about_panel: function() {}
      }
    };
  };

  return AboutmePage;

})(Page);

module.exports = AboutmePage;



},{"./page.coffee":"/home/emile/workspace/remindme/front/models/page.coffee"}],"/home/emile/workspace/remindme/front/models/page.coffee":[function(require,module,exports){
var Page, PageView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PageView = require('../views/page_view.coffee');

Page = (function(_super) {
  __extends(Page, _super);

  function Page() {
    return Page.__super__.constructor.apply(this, arguments);
  }


  /*
  Pages should extend this class
  Every page should have:
      - A set of functions in page.panels object.
        Template with same id as the functions name will be loaded
        Code from the function will be executed when panel is rendered
  On creation, a page view will be generated and linked to the model
   */

  Page.prototype.defaults = {
    title: 'untitled page',
    active: false
  };

  Page.prototype.initialize = function() {
    return this.set('view', new PageView({
      model: this
    }));
  };

  Page.prototype.isActive = function() {
    return this.get('active');
  };

  return Page;

})(Backbone.Model);

module.exports = Page;



},{"../views/page_view.coffee":"/home/emile/workspace/remindme/front/views/page_view.coffee"}],"/home/emile/workspace/remindme/front/models/remindme_page.coffee":[function(require,module,exports){
var Page, RemindmePage,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = require('./page.coffee');

RemindmePage = (function(_super) {
  __extends(RemindmePage, _super);

  function RemindmePage() {
    return RemindmePage.__super__.constructor.apply(this, arguments);
  }

  RemindmePage.prototype.defaults = function() {
    return {
      title: 'Remind me',
      panels: {
        'rme_welcome': function() {
          return console.log('my. na. is. zozor.');

          /*
          $('#no_button').click ->
              Backbone.trigger 'switchPanel', 'rme_date'
           */
        },
        'rme_date': function() {
          return $('.datepicker').datepicker().on('changeDate', function(e) {
            Backbone.trigger('setPageData', {
              'date': e.date
            });
            return Backbone.trigger('switchPanel', 'rme_email');
          });
        },
        'rme_email': function() {
          return console.log(pageData);
        }
      }
    };
  };

  return RemindmePage;

})(Page);

module.exports = RemindmePage;



},{"./page.coffee":"/home/emile/workspace/remindme/front/models/page.coffee"}],"/home/emile/workspace/remindme/front/views/header.coffee":[function(require,module,exports){
var Header, PageLinkView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Header = (function(_super) {
  __extends(Header, _super);

  function Header() {
    return Header.__super__.constructor.apply(this, arguments);
  }

  Header.prototype.el = '#header';

  Header.prototype.ui = {
    links: '#header-links'
  };

  Header.prototype.template = _.template($('#header-template').html());

  Header.prototype.initialize = function(options) {
    return this.pages = options.pages;
  };

  Header.prototype.render = function() {
    if (!this.fg) {
      this.fb_html = $('.fb-share-button').html();
    }
    this.$el.html(this.template);
    $('.fb-share-button').html(this.fb_html);
    return this.renderLinks();
  };

  Header.prototype.renderLinks = function() {
    var activePage, _el;
    _el = $(this.ui.links);
    _el.html('');
    activePage = this.pages.active;
    return this.pages.forEach(function(page) {
      var linkView;
      linkView = new PageLinkView({
        model: page,
        isActive: page === activePage
      });
      return _el.append(linkView.render().el);
    });
  };

  return Header;

})(Backbone.View);

PageLinkView = (function(_super) {
  __extends(PageLinkView, _super);

  function PageLinkView() {
    return PageLinkView.__super__.constructor.apply(this, arguments);
  }

  PageLinkView.prototype.tagName = 'li';

  PageLinkView.prototype.events = {
    'click': 'onClick'
  };

  PageLinkView.prototype.initialize = function(options) {
    return this.options = options;
  };

  PageLinkView.prototype.render = function() {
    this.$el.html("<a>" + this.model.get('title') + "</a>");
    if (this.options.isActive) {
      this.$el.addClass('active');
    }
    return this;
  };

  PageLinkView.prototype.onClick = function() {
    return Backbone.trigger('changePage', this.model);
  };

  return PageLinkView;

})(Backbone.View);

module.exports = Header;



},{}],"/home/emile/workspace/remindme/front/views/page_view.coffee":[function(require,module,exports){
var Page, PanelView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

PanelView = require('./panel_view.coffee');

Page = (function(_super) {
  __extends(Page, _super);

  function Page() {
    return Page.__super__.constructor.apply(this, arguments);
  }

  Page.prototype.el = '#page';

  Page.prototype.title = 'undefined_page';

  Page.prototype.initialize = function() {
    var panels;
    Backbone.on('switchPanel', this.switchPanel, this);
    panels = this.model.get('panels');
    if (panels) {
      return this.switchPanel(_.first(_.keys(panels)));
    }
  };

  Page.prototype.render = function() {
    return this.$el.html(this.model.get('activePanel').render().el);
  };

  Page.prototype.switchPanel = function(name) {
    var activePanel;
    if (__indexOf.call(_.functions(this.model.get('panels')), name) >= 0) {
      activePanel = new PanelView({
        model: new Backbone.Model({
          name: name,
          code: this.model.get('panels')[name]
        })
      });
      return this.model.set('activePanel', activePanel);
    }
  };

  Page.prototype.loadPanelJs = function() {
    var pan;
    console.log('handler', this.model);
    pan = this.model.get('activePanel');
    if (pan) {
      return pan.loadJs();
    }
  };

  return Page;

})(Backbone.View);

module.exports = Page;



},{"./panel_view.coffee":"/home/emile/workspace/remindme/front/views/panel_view.coffee"}],"/home/emile/workspace/remindme/front/views/panel_view.coffee":[function(require,module,exports){
var Panel, PanelView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PanelView = require('./panel_view.coffee');

Panel = (function(_super) {
  __extends(Panel, _super);

  function Panel() {
    return Panel.__super__.constructor.apply(this, arguments);
  }

  Panel.prototype.template = function() {
    var selector;
    selector = '#' + this.model.get('name');
    return _.template($(selector).html());
  };

  Panel.prototype.render = function() {
    var fun;
    this.$el.html(this.template());
    console.log('fun', this.$el.html());
    fun = this.model.get('code');
    fun.call(this);
    return this;
  };

  Panel.prototype.setTemplateFromId = function(id, js) {
    this.template = _.template($('#' + id).html());
    return this.loadJs = js;
  };

  return Panel;

})(Backbone.View);

module.exports = Panel;



},{"./panel_view.coffee":"/home/emile/workspace/remindme/front/views/panel_view.coffee"}]},{},["/home/emile/workspace/remindme/front/main.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L2NvbGxlY3Rpb25zL3BhZ2VzLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tYWluLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tb2RlbHMvYWJvdXRfcGFnZS5jb2ZmZWUiLCIvaG9tZS9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvbW9kZWxzL3BhZ2UuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L21vZGVscy9yZW1pbmRtZV9wYWdlLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC92aWV3cy9oZWFkZXIuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L3ZpZXdzL3BhZ2Vfdmlldy5jb2ZmZWUiLCIvaG9tZS9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvdmlld3MvcGFuZWxfdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLFdBQUE7RUFBQTtpU0FBQTs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLHVCQUFSLENBQVAsQ0FBQTs7QUFBQTtBQUlJLDBCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxrQkFBQSxLQUFBLEdBQU8sSUFBUCxDQUFBOztBQUFBLGtCQUVBLFVBQUEsR0FBWSxTQUFBLEdBQUE7V0FDUixRQUFRLENBQUMsRUFBVCxDQUFZLFlBQVosRUFBMEIsSUFBQyxDQUFBLGFBQTNCLEVBQTBDLElBQTFDLEVBRFE7RUFBQSxDQUZaLENBQUE7O0FBQUEsa0JBS0EsYUFBQSxHQUFlLFNBQUMs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Rk4sQ0FBQTtBQUFBLElBR0EsR0FBRyxDQUFDLElBQUosQ0FBUyxJQUFULENBSEEsQ0FBQTtXQUlBLEtBTEk7RUFBQSxDQUpSLENBQUE7O0FBQUEsa0JBV0EsaUJBQUEsR0FBbUIsU0FBQyxFQUFELEVBQUssRUFBTCxHQUFBO0FBQ2YsSUFBQSxJQUFDLENBQUEsUUFBRCxHQUFZLENBQUMsQ0FBQyxRQUFGLENBQVcsQ0FBQSxDQUFFLEdBQUEsR0FBTSxFQUFSLENBQVcsQ0FBQyxJQUFaLENBQUEsQ0FBWCxDQUFaLENBQUE7V0FDQSxJQUFDLENBQUEsTUFBRCxHQUFVLEdBRks7RUFBQSxDQVhuQixDQUFBOztlQUFBOztHQUZnQixRQUFRLENBQUMsS0FGN0IsQ0FBQTs7QUFBQSxNQW9CTSxDQUFDLE9BQVAsR0FBaUIsS0FwQmpCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiUGFnZSA9IHJlcXVpcmUgJy4uL21vZGVscy9wYWdlLmNvZmZlZSdcblxuY2xhc3MgUGFnZXMgZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG5cbiAgICBtb2RlbDogUGFnZVxuXG4gICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgICAgQmFja2JvbmUub24gJ2NoYW5nZVBhZ2UnLCBAc2V0QWN0aXZlUGFnZSwgQFxuXG4gICAgc2V0QWN0aXZlUGFnZTogKHBhZ2UpLT5cbiAgICAgICAgQGFjdGl2ZSA9IHBhZ2VcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlc1xuIiwiJCAtPlxuICAgICMjI1xuICAgIGFsbCBjbGFzcyBkZWYgbXVzdCBiZSBlbmNhcHN1bGF0ZWQgaW5zaWRlICQucmVhZHkoKVxuICAgIG90aGVyd2lzZSB0ZW1wbGF0ZXMgZnJvbSBwYWdlLmh0bWwgd29uJ3QgYmUgYXZhaWxhYmxlLlxuICAgICMjI1xuICAgIFxuICAgICNGb3JtVmlldyA9IHJlcXVpcmUgJy4vdmlld3MvZm9ybV92aWV3LmNvZmZlZSdcbiAgICAjRm9ybSA9IHJlcXVpcmUgJy4vbW9kZWxzL2Zvcm0uY29mZmVlJ1xuXG4gICAgSGVhZGVyID0gcmVxdWlyZSAnLi92aWV3cy9oZWFkZXIuY29mZmVlJ1xuICAgIFBhZ2VzID0gcmVxdWlyZSAnLi9jb2xsZWN0aW9ucy9wYWdlcy5jb2ZmZWUnXG4gICAgUmVtaW5kbWVQYWdlID0gcmVxdWlyZSAnLi9tb2RlbHMvcmVtaW5kbWVfcGFnZS5jb2ZmZWUnXG4gICAgQWJvdXRQYWdlID0gcmVxdWlyZSAnLi9tb2RlbHMvYWJvdXRfcGFnZS5jb2ZmZWUnXG5cblxuICAgIGNsYXNzIEFwcFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICAgICAgZXZlbnRzOlxuICAgICAgICAgICAgJ2NoYW5nZVBhZ2UnOiAnb25DaGFuZ2VQYWdlJ1xuXG4gICAgICAgIGluaXRpYWxpemU6IC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnSW5pdGlhbGl6aW5nIGFwcCdcblxuICAgICAgICAgICAgcmVtaW5kbWUgPSBuZXcgUmVtaW5kbWVQYWdlKClcbiAgICAgICAgICAgIGFib3V0ID0gbmV3IEFib3V0UGFnZSgpXG4gICAgICAgICAgICBAcGFnZXMgPSBuZXcgUGFnZXMoW3JlbWluZG1lLCBhYm91dF0pXG5cbiAgICAgICAgICAgIEBoZWFkZXIgPSBuZXcgSGVhZGVyXG4gICAgICAgICAgICAgICAgcGFnZXM6IEBwYWdlc1xuXG4gICAgICAgICAgICBAaW5pdExpc3RlbmVyKClcbiAgICAgICAgICAgIEByZW5kZXIoKVxuXG4gICAgICAgIGluaXRMaXN0ZW5lcjogLT5cbiAgICAgICAgICAgICMgYWxsb3cgYXBwIGZ1bmN0aW9ucyB0byBiZSB0cmlnZ2VyZWQgd2l0aCBldmVudHNcbiAgICAgICAgICAgIGFwcCA9IEBcbiAgICAgICAgICAgIEJhY2tib25lLm9uICdhbGwnLCAobmFtZSktPlxuICAgICAgICAgICAgICAgIGFwcFtuYW1lXS5hcHBseSBhcHAsIGFyZ3VtZW50cyBpZiBuYW1lIGluIF8uZnVuY3Rpb25zKGFwcClcblxuICAgICAgICBzaG93Rmlyc3RQYWdlOiAtPlxuICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlciAnY2hhbmdlUGFnZScsIEBwYWdlcy5maXJzdCgpXG5cbiAgICAgICAgcmVuZGVyOiAtPlxuICAgICAgICAgICAgQGhlYWRlci5yZW5kZXIoKVxuICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlciAncmVuZGVyZWQnXG4gICAgICAgICAgICBAXG5cbiAgICAgICAgY2hhbmdlUGFnZTogKGUsIHBhZ2UpLT5cbiAgICAgICAgICAgIHBhZ2UuZ2V0KCd2aWV3JykucmVuZGVyKClcbiAgICAgICAgICAgIEBoZWFkZXIucmVuZGVyTGlua3MoKVxuXG4gICAgX2FwcCA9IG5ldyBBcHBWaWV3KClcbiAgICBCYWNrYm9uZS50cmlnZ2VyICdzaG93Rmlyc3RQYWdlJ1xuIiwiUGFnZSA9IHJlcXVpcmUgJy4vcGFnZS5jb2ZmZWUnXG5cbmNsYXNzIEFib3V0bWVQYWdlIGV4dGVuZHMgUGFnZVxuICAgIFxuICAgIGRlZmF1bHRzOiAtPlxuICAgICAgICB0aXRsZTogJ0Fib3V0J1xuICAgICAgICBwYW5lbHM6XG4gICAgICAgICAgICBhYm91dF9wYW5lbDogLT5cblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dG1lUGFnZSIsIlBhZ2VWaWV3ID0gcmVxdWlyZSAnLi4vdmlld3MvcGFnZV92aWV3LmNvZmZlZSdcblxuY2xhc3MgUGFnZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gICAgIyMjXG4gICAgUGFnZXMgc2hvdWxkIGV4dGVuZCB0aGlzIGNsYXNzXG4gICAgRXZlcnkgcGFnZSBzaG91bGQgaGF2ZTpcbiAgICAgICAgLSBBIHNldCBvZiBmdW5jdGlvbnMgaW4gcGFnZS5wYW5lbHMgb2JqZWN0LlxuICAgICAgICAgIFRlbXBsYXRlIHdpdGggc2FtZSBpZCBhcyB0aGUgZnVuY3Rpb25zIG5hbWUgd2lsbCBiZSBsb2FkZWRcbiAgICAgICAgICBDb2RlIGZyb20gdGhlIGZ1bmN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBwYW5lbCBpcyByZW5kZXJlZFxuICAgIE9uIGNyZWF0aW9uLCBhIHBhZ2UgdmlldyB3aWxsIGJlIGdlbmVyYXRlZCBhbmQgbGlua2VkIHRvIHRoZSBtb2RlbFxuICAgICMjI1xuXG4gICAgZGVmYXVsdHM6XG4gICAgICAgIHRpdGxlOiAndW50aXRsZWQgcGFnZSdcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxuXG4gICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgICAgQHNldCAndmlldycsIG5ldyBQYWdlVmlld1xuICAgICAgICAgICAgbW9kZWw6IEBcblxuICAgIGlzQWN0aXZlOiAtPlxuICAgICAgICBAZ2V0KCdhY3RpdmUnKVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlXG4iLCJcblBhZ2UgPSByZXF1aXJlICcuL3BhZ2UuY29mZmVlJ1xuXG5jbGFzcyBSZW1pbmRtZVBhZ2UgZXh0ZW5kcyBQYWdlXG4gICAgXG4gICAgZGVmYXVsdHM6IC0+XG4gICAgICAgIHRpdGxlOiAnUmVtaW5kIG1lJ1xuICAgICAgICBwYW5lbHM6XG4gICAgICAgICAgICAncm1lX3dlbGNvbWUnOiAtPlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdteS4gbmEuIGlzLiB6b3pvci4nXG4gICAgICAgICAgICAgICAgIyMjXG4gICAgICAgICAgICAgICAgJCgnI25vX2J1dHRvbicpLmNsaWNrIC0+XG4gICAgICAgICAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3N3aXRjaFBhbmVsJywgJ3JtZV9kYXRlJ1xuICAgICAgICAgICAgICAgICMjI1xuXG4gICAgICAgICAgICAncm1lX2RhdGUnOiAtPlxuICAgICAgICAgICAgICAgICQoJy5kYXRlcGlja2VyJykuZGF0ZXBpY2tlcigpLm9uICdjaGFuZ2VEYXRlJywgKGUpLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3NldFBhZ2VEYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0ZSc6IGUuZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlciAnc3dpdGNoUGFuZWwnLCAncm1lX2VtYWlsJ1xuXG4gICAgICAgICAgICAncm1lX2VtYWlsJzogLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyBwYWdlRGF0YVxuICAgIFxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbWluZG1lUGFnZVxuIiwiXG5jbGFzcyBIZWFkZXIgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICBlbDogJyNoZWFkZXInXG5cbiAgICB1aTpcbiAgICAgICAgbGlua3M6ICcjaGVhZGVyLWxpbmtzJ1xuXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUgJCgnI2hlYWRlci10ZW1wbGF0ZScpLmh0bWwoKVxuXG4gICAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpLT5cbiAgICAgICAgQHBhZ2VzID0gb3B0aW9ucy5wYWdlc1xuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICAjIEF2b2lkIGxvc2luZyBmYl9idXR0b24gaHRtbFxuICAgICAgICBAZmJfaHRtbCA9ICQoJy5mYi1zaGFyZS1idXR0b24nKS5odG1sKCkgaWYgbm90IEBmZ1xuICAgICAgICBAJGVsLmh0bWwgQHRlbXBsYXRlXG4gICAgICAgICQoJy5mYi1zaGFyZS1idXR0b24nKS5odG1sKEBmYl9odG1sKVxuICAgICAgICBAcmVuZGVyTGlua3MoKVxuXG4gICAgcmVuZGVyTGlua3M6IC0+XG4gICAgICAgIF9lbCA9ICQgQHVpLmxpbmtzXG4gICAgICAgIF9lbC5odG1sICcnXG5cbiAgICAgICAgYWN0aXZlUGFnZSA9IEBwYWdlcy5hY3RpdmVcbiAgICAgICAgQHBhZ2VzLmZvckVhY2ggKHBhZ2UpIC0+XG4gICAgICAgICAgIGxpbmtWaWV3ID0gbmV3IFBhZ2VMaW5rVmlld1xuICAgICAgICAgICAgICAgIG1vZGVsOiBwYWdlXG4gICAgICAgICAgICAgICAgaXNBY3RpdmU6IHBhZ2UgPT0gYWN0aXZlUGFnZVxuICAgICAgICAgICBfZWwuYXBwZW5kIGxpbmtWaWV3LnJlbmRlcigpLmVsXG5cblxuY2xhc3MgUGFnZUxpbmtWaWV3IGV4dGVuZHMgQmFja2JvbmUuVmlld1xuICAgIHRhZ05hbWU6ICdsaSdcblxuICAgIGV2ZW50czpcbiAgICAgICAgJ2NsaWNrJzogJ29uQ2xpY2snXG5cbiAgICBpbml0aWFsaXplOiAob3B0aW9ucyktPlxuICAgICAgICBAb3B0aW9ucyA9IG9wdGlvbnNcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQCRlbC5odG1sIFwiPGE+XCIgKyBAbW9kZWwuZ2V0KCd0aXRsZScpICsgXCI8L2E+XCJcbiAgICAgICAgQCRlbC5hZGRDbGFzcyAnYWN0aXZlJyBpZiBAb3B0aW9ucy5pc0FjdGl2ZVxuICAgICAgICBAXG5cbiAgICBvbkNsaWNrOiAtPlxuICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdjaGFuZ2VQYWdlJywgQG1vZGVsXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclxuIiwiUGFuZWxWaWV3ID0gcmVxdWlyZSAnLi9wYW5lbF92aWV3LmNvZmZlZSdcblxuY2xhc3MgUGFnZSBleHRlbmRzIEJhY2tib25lLlZpZXdcblxuICAgIGVsOiAnI3BhZ2UnXG5cbiAgICB0aXRsZTogJ3VuZGVmaW5lZF9wYWdlJ1xuXG4gICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgICAgQmFja2JvbmUub24gJ3N3aXRjaFBhbmVsJywgQHN3aXRjaFBhbmVsLCBAXG5cbiAgICAgICAgcGFuZWxzID0gQG1vZGVsLmdldCAncGFuZWxzJ1xuICAgICAgICBAc3dpdGNoUGFuZWwgXy5maXJzdCBfLmtleXMgcGFuZWxzIGlmIHBhbmVsc1xuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBAJGVsLmh0bWwgQG1vZGVsLmdldCgnYWN0aXZlUGFuZWwnKS5yZW5kZXIoKS5lbFxuICAgICAgICAjQmFja2JvbmUudHJpZ2dlciAncmVuZGVyZWQnXG5cbiAgICBzd2l0Y2hQYW5lbDogKG5hbWUpLT5cbiAgICAgICAgaWYgbmFtZSBpbiBfLmZ1bmN0aW9ucyBAbW9kZWwuZ2V0ICdwYW5lbHMnXG4gICAgICAgICAgICBhY3RpdmVQYW5lbCA9IG5ldyBQYW5lbFZpZXdcbiAgICAgICAgICAgICAgICBtb2RlbDogbmV3IEJhY2tib25lLk1vZGVsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgICAgICAgICAgICAgY29kZTogQG1vZGVsLmdldCgncGFuZWxzJylbbmFtZV1cbiAgICAgICAgICAgIEBtb2RlbC5zZXQgJ2FjdGl2ZVBhbmVsJywgYWN0aXZlUGFuZWxcblxuICAgIGxvYWRQYW5lbEpzOiAtPlxuICAgICAgICBjb25zb2xlLmxvZyAnaGFuZGxlcicsIEBtb2RlbFxuICAgICAgICBwYW4gPSBAbW9kZWwuZ2V0KCdhY3RpdmVQYW5lbCcpXG4gICAgICAgIHBhbi5sb2FkSnMoKSBpZiBwYW5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZVxuIiwiUGFuZWxWaWV3ID0gcmVxdWlyZSAnLi9wYW5lbF92aWV3LmNvZmZlZSdcblxuY2xhc3MgUGFuZWwgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICB0ZW1wbGF0ZTogLT5cbiAgICAgICAgc2VsZWN0b3IgPSAnIycgKyBAbW9kZWwuZ2V0ICduYW1lJ1xuICAgICAgICBfLnRlbXBsYXRlICQoc2VsZWN0b3IpLmh0bWwoKVxuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBAJGVsLmh0bWwgQHRlbXBsYXRlKClcbiAgICAgICAgY29uc29sZS5sb2cgJ2Z1bicsIEAkZWwuaHRtbCgpXG4gICAgICAgIGZ1biA9IEBtb2RlbC5nZXQgJ2NvZGUnXG4gICAgICAgIGZ1bi5jYWxsIEBcbiAgICAgICAgQFxuICAgIFxuICAgIHNldFRlbXBsYXRlRnJvbUlkOiAoaWQsIGpzKS0+XG4gICAgICAgIEB0ZW1wbGF0ZSA9IF8udGVtcGxhdGUgJCgnIycgKyBpZCkuaHRtbCgpXG4gICAgICAgIEBsb2FkSnMgPSBqc1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFuZWwiXX0=
