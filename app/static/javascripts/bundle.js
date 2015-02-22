(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/emile/workspace/remindme/front/collections/pages.coffee":[function(require,module,exports){
var Page, Pages,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Page = require('../models/page.coffee');

Pages = (function(superClass) {
  extend(Pages, superClass);

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



},{"../models/page.coffee":"/Users/emile/workspace/remindme/front/models/page.coffee"}],"/Users/emile/workspace/remindme/front/main.coffee":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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
  AppView = (function(superClass) {
    extend(AppView, superClass);

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
        if (indexOf.call(_.functions(app), name) >= 0) {
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



},{"./collections/pages.coffee":"/Users/emile/workspace/remindme/front/collections/pages.coffee","./models/about_page.coffee":"/Users/emile/workspace/remindme/front/models/about_page.coffee","./models/remindme_page.coffee":"/Users/emile/workspace/remindme/front/models/remindme_page.coffee","./views/header.coffee":"/Users/emile/workspace/remindme/front/views/header.coffee"}],"/Users/emile/workspace/remindme/front/models/about_page.coffee":[function(require,module,exports){
var AboutmePage, Page,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Page = require('./page.coffee');

AboutmePage = (function(superClass) {
  extend(AboutmePage, superClass);

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



},{"./page.coffee":"/Users/emile/workspace/remindme/front/models/page.coffee"}],"/Users/emile/workspace/remindme/front/models/page.coffee":[function(require,module,exports){
var Page, PageView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PageView = require('../views/page_view.coffee');

Page = (function(superClass) {
  extend(Page, superClass);

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



},{"../views/page_view.coffee":"/Users/emile/workspace/remindme/front/views/page_view.coffee"}],"/Users/emile/workspace/remindme/front/models/remindme_page.coffee":[function(require,module,exports){
var Page, RemindmePage,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Page = require('./page.coffee');

RemindmePage = (function(superClass) {
  extend(RemindmePage, superClass);

  function RemindmePage() {
    return RemindmePage.__super__.constructor.apply(this, arguments);
  }

  RemindmePage.prototype.defaults = function() {
    return {
      title: 'Remind me',
      panels: {
        'rme_welcome': function() {
          return $('#no_button').click(function() {
            console.log('Miracle');
            return Backbone.trigger('switchPanel', 'rme_date');
          });
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



},{"./page.coffee":"/Users/emile/workspace/remindme/front/models/page.coffee"}],"/Users/emile/workspace/remindme/front/views/header.coffee":[function(require,module,exports){
var Header, PageLinkView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Header = (function(superClass) {
  extend(Header, superClass);

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
    var _el, activePage;
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

PageLinkView = (function(superClass) {
  extend(PageLinkView, superClass);

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



},{}],"/Users/emile/workspace/remindme/front/views/page_view.coffee":[function(require,module,exports){
var Page, PanelView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

PanelView = require('./panel_view.coffee');

Page = (function(superClass) {
  extend(Page, superClass);

  function Page() {
    return Page.__super__.constructor.apply(this, arguments);
  }

  Page.prototype.el = '#page';

  Page.prototype.title = 'default title';

  Page.prototype.initialize = function() {
    var panels;
    Backbone.on('switchPanel', this.switchPanel, this);
    panels = this.model.get('panels');
    if (panels) {
      return this.switchPanel(_.first(_.keys(panels)));
    }
  };

  Page.prototype.render = function() {
    this.$el.html(this.model.get('activePanel').render().el);
    console.log($('#no_button'));
    console.log('triggering page rendered');
    return Backbone.trigger('page_rendered');
  };

  Page.prototype.switchPanel = function(name) {
    var activePanel;
    console.log('switching panel', name);
    if (indexOf.call(_.functions(this.model.get('panels')), name) >= 0) {
      activePanel = new PanelView({
        model: new Backbone.Model({
          name: name,
          code: this.model.get('panels')[name]
        })
      });
      this.model.set('activePanel', activePanel);
      return this.render();
    }
  };

  return Page;

})(Backbone.View);

module.exports = Page;



},{"./panel_view.coffee":"/Users/emile/workspace/remindme/front/views/panel_view.coffee"}],"/Users/emile/workspace/remindme/front/views/panel_view.coffee":[function(require,module,exports){
var Panel, PanelView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PanelView = require('./panel_view.coffee');

Panel = (function(superClass) {
  extend(Panel, superClass);

  function Panel() {
    return Panel.__super__.constructor.apply(this, arguments);
  }

  Panel.prototype.initialize = function() {
    return Backbone.on('page_rendered', this.loadPanelJs, this);
  };

  Panel.prototype.template = function() {
    var selector;
    selector = '#' + this.model.get('name');
    return _.template($(selector).html());
  };

  Panel.prototype.render = function() {
    this.$el.html(this.template());
    return this;
  };

  Panel.prototype.loadPanelJs = function() {
    console.log('Loading panel Javascrpt');
    return this.model.get('code').call(this);
  };

  return Panel;

})(Backbone.View);

module.exports = Panel;



},{"./panel_view.coffee":"/Users/emile/workspace/remindme/front/views/panel_view.coffee"}]},{},["/Users/emile/workspace/remindme/front/main.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L2NvbGxlY3Rpb25zL3BhZ2VzLmNvZmZlZSIsIi9Vc2Vycy9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvbWFpbi5jb2ZmZWUiLCIvVXNlcnMvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L21vZGVscy9hYm91dF9wYWdlLmNvZmZlZSIsIi9Vc2Vycy9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvbW9kZWxzL3BhZ2UuY29mZmVlIiwiL1VzZXJzL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tb2RlbHMvcmVtaW5kbWVfcGFnZS5jb2ZmZWUiLCIvVXNlcnMvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L3ZpZXdzL2hlYWRlci5jb2ZmZWUiLCIvVXNlcnMvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L3ZpZXdzL3BhZ2Vfdmlldy5jb2ZmZWUiLCIvVXNlcnMvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L3ZpZXdzL3BhbmVsX3ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxXQUFBO0VBQUE7NkJBQUE7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSx1QkFBUixDQUFQLENBQUE7O0FBQUE7QUFJSSwyQkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsa0JBQUEsS0FBQSxHQUFPLElBQVAsQ0FBQTs7QUFBQSxrQkFFQSxVQUFBLEdBQVksU0FBQSxHQUFBO1dBQ1IsUUFBUSxDQUFDLEVBQVQsQ0FBWSxZQUFaLEVBQTBCLElBQUMsQ0FBQSxhQUEzQixFQUEwQyxJQUExQyxFQURRO0VBQUEsQ0FGWixDQUFBOztBQUFBLGtCQUtBLGFBQUEsR0FBZSxTQUFDLElBQUQsR0FBQTtXQUNY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QUFHLENBQUMsSUFBTCxDQUFVLElBQUMsQ0FBQSxRQUFELENBQUEsQ0FBVixDQUFBLENBQUE7V0FDQSxLQUZJO0VBQUEsQ0FQUixDQUFBOztBQUFBLGtCQVdBLFdBQUEsR0FBYSxTQUFBLEdBQUE7QUFDVCxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVkseUJBQVosQ0FBQSxDQUFBO1dBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsTUFBWCxDQUFrQixDQUFDLElBQW5CLENBQXdCLElBQXhCLEVBRlM7RUFBQSxDQVhiLENBQUE7O2VBQUE7O0dBRmdCLFFBQVEsQ0FBQyxLQUY3QixDQUFBOztBQUFBLE1Bb0JNLENBQUMsT0FBUCxHQUFpQixLQXBCakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJQYWdlID0gcmVxdWlyZSAnLi4vbW9kZWxzL3BhZ2UuY29mZmVlJ1xuXG5jbGFzcyBQYWdlcyBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cblxuICAgIG1vZGVsOiBQYWdlXG5cbiAgICBpbml0aWFsaXplOiAtPlxuICAgICAgICBCYWNrYm9uZS5vbiAnY2hhbmdlUGFnZScsIEBzZXRBY3RpdmVQYWdlLCBAXG5cbiAgICBzZXRBY3RpdmVQYWdlOiAocGFnZSktPlxuICAgICAgICBAYWN0aXZlID0gcGFnZVxuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VzXG4iLCIkIC0+XG4gICAgIyMjXG4gICAgYWxsIGNsYXNzIGRlZiBtdXN0IGJlIGVuY2Fwc3VsYXRlZCBpbnNpZGUgJC5yZWFkeSgpXG4gICAgb3RoZXJ3aXNlIHRlbXBsYXRlcyBmcm9tIHBhZ2UuaHRtbCB3b24ndCBiZSBhdmFpbGFibGUuXG4gICAgIyMjXG4gICAgXG4gICAgI0Zvcm1WaWV3ID0gcmVxdWlyZSAnLi92aWV3cy9mb3JtX3ZpZXcuY29mZmVlJ1xuICAgICNGb3JtID0gcmVxdWlyZSAnLi9tb2RlbHMvZm9ybS5jb2ZmZWUnXG5cbiAgICBIZWFkZXIgPSByZXF1aXJlICcuL3ZpZXdzL2hlYWRlci5jb2ZmZWUnXG4gICAgUGFnZXMgPSByZXF1aXJlICcuL2NvbGxlY3Rpb25zL3BhZ2VzLmNvZmZlZSdcbiAgICBSZW1pbmRtZVBhZ2UgPSByZXF1aXJlICcuL21vZGVscy9yZW1pbmRtZV9wYWdlLmNvZmZlZSdcbiAgICBBYm91dFBhZ2UgPSByZXF1aXJlICcuL21vZGVscy9hYm91dF9wYWdlLmNvZmZlZSdcblxuXG4gICAgY2xhc3MgQXBwVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXdcblxuICAgICAgICBldmVudHM6XG4gICAgICAgICAgICAnY2hhbmdlUGFnZSc6ICdvbkNoYW5nZVBhZ2UnXG5cbiAgICAgICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdJbml0aWFsaXppbmcgYXBwJ1xuXG4gICAgICAgICAgICByZW1pbmRtZSA9IG5ldyBSZW1pbmRtZVBhZ2UoKVxuICAgICAgICAgICAgYWJvdXQgPSBuZXcgQWJvdXRQYWdlKClcbiAgICAgICAgICAgIEBwYWdlcyA9IG5ldyBQYWdlcyhbcmVtaW5kbWUsIGFib3V0XSlcblxuICAgICAgICAgICAgQGhlYWRlciA9IG5ldyBIZWFkZXJcbiAgICAgICAgICAgICAgICBwYWdlczogQHBhZ2VzXG5cbiAgICAgICAgICAgIEBpbml0TGlzdGVuZXIoKVxuICAgICAgICAgICAgQHJlbmRlcigpXG5cbiAgICAgICAgaW5pdExpc3RlbmVyOiAtPlxuICAgICAgICAgICAgIyBhbGxvdyBhcHAgZnVuY3Rpb25zIHRvIGJlIHRyaWdnZXJlZCB3aXRoIGV2ZW50c1xuICAgICAgICAgICAgYXBwID0gQFxuICAgICAgICAgICAgQmFja2JvbmUub24gJ2FsbCcsIChuYW1lKS0+XG4gICAgICAgICAgICAgICAgYXBwW25hbWVdLmFwcGx5IGFwcCwgYXJndW1lbnRzIGlmIG5hbWUgaW4gXy5mdW5jdGlvbnMoYXBwKVxuXG4gICAgICAgIHNob3dGaXJzdFBhZ2U6IC0+XG4gICAgICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdjaGFuZ2VQYWdlJywgQHBhZ2VzLmZpcnN0KClcblxuICAgICAgICByZW5kZXI6IC0+XG4gICAgICAgICAgICBAaGVhZGVyLnJlbmRlcigpXG4gICAgICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdyZW5kZXJlZCdcbiAgICAgICAgICAgIEBcblxuICAgICAgICBjaGFuZ2VQYWdlOiAoZSwgcGFnZSktPlxuICAgICAgICAgICAgcGFnZS5nZXQoJ3ZpZXcnKS5yZW5kZXIoKVxuICAgICAgICAgICAgQGhlYWRlci5yZW5kZXJMaW5rcygpXG5cbiAgICBfYXBwID0gbmV3IEFwcFZpZXcoKVxuICAgIEJhY2tib25lLnRyaWdnZXIgJ3Nob3dGaXJzdFBhZ2UnXG4iLCJQYWdlID0gcmVxdWlyZSAnLi9wYWdlLmNvZmZlZSdcblxuY2xhc3MgQWJvdXRtZVBhZ2UgZXh0ZW5kcyBQYWdlXG4gICAgXG4gICAgZGVmYXVsdHM6IC0+XG4gICAgICAgIHRpdGxlOiAnQWJvdXQnXG4gICAgICAgIHBhbmVsczpcbiAgICAgICAgICAgIGFib3V0X3BhbmVsOiAtPlxuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0bWVQYWdlIiwiUGFnZVZpZXcgPSByZXF1aXJlICcuLi92aWV3cy9wYWdlX3ZpZXcuY29mZmVlJ1xuXG5jbGFzcyBQYWdlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgICAjIyNcbiAgICBQYWdlcyBzaG91bGQgZXh0ZW5kIHRoaXMgY2xhc3NcbiAgICBFdmVyeSBwYWdlIHNob3VsZCBoYXZlOlxuICAgICAgICAtIEEgc2V0IG9mIGZ1bmN0aW9ucyBpbiBwYWdlLnBhbmVscyBvYmplY3QuXG4gICAgICAgICAgVGVtcGxhdGUgd2l0aCBzYW1lIGlkIGFzIHRoZSBmdW5jdGlvbnMgbmFtZSB3aWxsIGJlIGxvYWRlZFxuICAgICAgICAgIENvZGUgZnJvbSB0aGUgZnVuY3Rpb24gd2lsbCBiZSBleGVjdXRlZCB3aGVuIHBhbmVsIGlzIHJlbmRlcmVkXG4gICAgT24gY3JlYXRpb24sIGEgcGFnZSB2aWV3IHdpbGwgYmUgZ2VuZXJhdGVkIGFuZCBsaW5rZWQgdG8gdGhlIG1vZGVsXG4gICAgIyMjXG5cbiAgICBkZWZhdWx0czpcbiAgICAgICAgdGl0bGU6ICd1bnRpdGxlZCBwYWdlJ1xuICAgICAgICBhY3RpdmU6IGZhbHNlXG5cbiAgICBpbml0aWFsaXplOiAtPlxuICAgICAgICBAc2V0ICd2aWV3JywgbmV3IFBhZ2VWaWV3XG4gICAgICAgICAgICBtb2RlbDogQFxuXG4gICAgaXNBY3RpdmU6IC0+XG4gICAgICAgIEBnZXQoJ2FjdGl2ZScpXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VcbiIsIlxuUGFnZSA9IHJlcXVpcmUgJy4vcGFnZS5jb2ZmZWUnXG5cbmNsYXNzIFJlbWluZG1lUGFnZSBleHRlbmRzIFBhZ2VcbiAgICBcbiAgICBkZWZhdWx0czogLT5cbiAgICAgICAgdGl0bGU6ICdSZW1pbmQgbWUnXG4gICAgICAgIHBhbmVsczpcbiAgICAgICAgICAgICdybWVfd2VsY29tZSc6IC0+XG4gICAgICAgICAgICAgICAgJCgnI25vX2J1dHRvbicpLmNsaWNrIC0+XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdNaXJhY2xlJ1xuICAgICAgICAgICAgICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdzd2l0Y2hQYW5lbCcsICdybWVfZGF0ZSdcblxuICAgICAgICAgICAgJ3JtZV9kYXRlJzogLT5cbiAgICAgICAgICAgICAgICAkKCcuZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoKS5vbiAnY2hhbmdlRGF0ZScsIChlKS0+XG4gICAgICAgICAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3NldFBhZ2VEYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRlJzogZS5kYXRlXG4gICAgICAgICAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3N3aXRjaFBhbmVsJywgJ3JtZV9lbWFpbCdcblxuICAgICAgICAgICAgJ3JtZV9lbWFpbCc6IC0+XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgcGFnZURhdGFcbiAgICBcblxubW9kdWxlLmV4cG9ydHMgPSBSZW1pbmRtZVBhZ2VcbiIsIlxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgZWw6ICcjaGVhZGVyJ1xuXG4gICAgdWk6XG4gICAgICAgIGxpbmtzOiAnI2hlYWRlci1saW5rcydcblxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlICQoJyNoZWFkZXItdGVtcGxhdGUnKS5odG1sKClcblxuICAgIGluaXRpYWxpemU6IChvcHRpb25zKS0+XG4gICAgICAgIEBwYWdlcyA9IG9wdGlvbnMucGFnZXNcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgIyBBdm9pZCBsb3NpbmcgZmJfYnV0dG9uIGh0bWxcbiAgICAgICAgQGZiX2h0bWwgPSAkKCcuZmItc2hhcmUtYnV0dG9uJykuaHRtbCgpIGlmIG5vdCBAZmdcbiAgICAgICAgQCRlbC5odG1sIEB0ZW1wbGF0ZVxuICAgICAgICAkKCcuZmItc2hhcmUtYnV0dG9uJykuaHRtbChAZmJfaHRtbClcbiAgICAgICAgQHJlbmRlckxpbmtzKClcblxuICAgIHJlbmRlckxpbmtzOiAtPlxuICAgICAgICBfZWwgPSAkIEB1aS5saW5rc1xuICAgICAgICBfZWwuaHRtbCAnJ1xuXG4gICAgICAgIGFjdGl2ZVBhZ2UgPSBAcGFnZXMuYWN0aXZlXG4gICAgICAgIEBwYWdlcy5mb3JFYWNoIChwYWdlKSAtPlxuICAgICAgICAgICBsaW5rVmlldyA9IG5ldyBQYWdlTGlua1ZpZXdcbiAgICAgICAgICAgICAgICBtb2RlbDogcGFnZVxuICAgICAgICAgICAgICAgIGlzQWN0aXZlOiBwYWdlID09IGFjdGl2ZVBhZ2VcbiAgICAgICAgICAgX2VsLmFwcGVuZCBsaW5rVmlldy5yZW5kZXIoKS5lbFxuXG5cbmNsYXNzIFBhZ2VMaW5rVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXdcbiAgICB0YWdOYW1lOiAnbGknXG5cbiAgICBldmVudHM6XG4gICAgICAgICdjbGljayc6ICdvbkNsaWNrJ1xuXG4gICAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpLT5cbiAgICAgICAgQG9wdGlvbnMgPSBvcHRpb25zXG5cbiAgICByZW5kZXI6IC0+XG4gICAgICAgIEAkZWwuaHRtbCBcIjxhPlwiICsgQG1vZGVsLmdldCgndGl0bGUnKSArIFwiPC9hPlwiXG4gICAgICAgIEAkZWwuYWRkQ2xhc3MgJ2FjdGl2ZScgaWYgQG9wdGlvbnMuaXNBY3RpdmVcbiAgICAgICAgQFxuXG4gICAgb25DbGljazogLT5cbiAgICAgICAgQmFja2JvbmUudHJpZ2dlciAnY2hhbmdlUGFnZScsIEBtb2RlbFxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJcbiIsIlBhbmVsVmlldyA9IHJlcXVpcmUgJy4vcGFuZWxfdmlldy5jb2ZmZWUnXG5cbmNsYXNzIFBhZ2UgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICBlbDogJyNwYWdlJ1xuXG4gICAgdGl0bGU6ICdkZWZhdWx0IHRpdGxlJ1xuXG4gICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgICAgQmFja2JvbmUub24gJ3N3aXRjaFBhbmVsJywgQHN3aXRjaFBhbmVsLCBAXG5cbiAgICAgICAgcGFuZWxzID0gQG1vZGVsLmdldCAncGFuZWxzJ1xuICAgICAgICBAc3dpdGNoUGFuZWwgXy5maXJzdCBfLmtleXMgcGFuZWxzIGlmIHBhbmVsc1xuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBAJGVsLmh0bWwgQG1vZGVsLmdldCgnYWN0aXZlUGFuZWwnKS5yZW5kZXIoKS5lbFxuICAgICAgICBjb25zb2xlLmxvZyAkICcjbm9fYnV0dG9uJ1xuICAgICAgICBjb25zb2xlLmxvZyAndHJpZ2dlcmluZyBwYWdlIHJlbmRlcmVkJ1xuICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdwYWdlX3JlbmRlcmVkJ1xuXG4gICAgc3dpdGNoUGFuZWw6IChuYW1lKS0+XG4gICAgICAgIGNvbnNvbGUubG9nICdzd2l0Y2hpbmcgcGFuZWwnLCBuYW1lXG4gICAgICAgIGlmIG5hbWUgaW4gXy5mdW5jdGlvbnMgQG1vZGVsLmdldCAncGFuZWxzJ1xuICAgICAgICAgICAgYWN0aXZlUGFuZWwgPSBuZXcgUGFuZWxWaWV3XG4gICAgICAgICAgICAgICAgbW9kZWw6IG5ldyBCYWNrYm9uZS5Nb2RlbFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IEBtb2RlbC5nZXQoJ3BhbmVscycpW25hbWVdXG4gICAgICAgICAgICBAbW9kZWwuc2V0ICdhY3RpdmVQYW5lbCcsIGFjdGl2ZVBhbmVsXG4gICAgICAgICAgICBAcmVuZGVyKClcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZVxuIiwiUGFuZWxWaWV3ID0gcmVxdWlyZSAnLi9wYW5lbF92aWV3LmNvZmZlZSdcblxuY2xhc3MgUGFuZWwgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICBpbml0aWFsaXplOiAtPlxuICAgICAgICBCYWNrYm9uZS5vbiAncGFnZV9yZW5kZXJlZCcsIEBsb2FkUGFuZWxKcywgQFxuXG4gICAgdGVtcGxhdGU6IC0+XG4gICAgICAgIHNlbGVjdG9yID0gJyMnICsgQG1vZGVsLmdldCAnbmFtZSdcbiAgICAgICAgXy50ZW1wbGF0ZSAkKHNlbGVjdG9yKS5odG1sKClcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQCRlbC5odG1sIEB0ZW1wbGF0ZSgpXG4gICAgICAgIEBcbiAgICBcbiAgICBsb2FkUGFuZWxKczogLT5cbiAgICAgICAgY29uc29sZS5sb2cgJ0xvYWRpbmcgcGFuZWwgSmF2YXNjcnB0J1xuICAgICAgICBAbW9kZWwuZ2V0KCdjb2RlJykuY2FsbCBAXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYW5lbFxuIl19
