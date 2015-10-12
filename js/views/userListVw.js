var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    usersShortCollection = require('../collections/usersShortCl'),
    userShortView = require('./userShortVw'),
    simpleMessageView = require('./simpleMessageVw');

var updateOptions = function (context) {
  return function (options) {
    console.log("[userListVw.js:11] updateOptions()");

    context.options = options;
    /*expected options:
     options.title: title for no users found
     options.message: message for no users found
     */
    //the model must be passed in by the constructor
    context.usersShort = new usersShortCollection(this.
        model);
    context.subViews = [];
    context.render();
  };
};

var updateItem =
    function (context) {
      return function (item) {
        if(!item || typeof item !== 'object') {
          throw "[userListVw.js:30] addItem() Invalid item passed";
        }
        console.log("[userListVw.js:27] addItem()", item);
        __.extend(context.options, item);
        context.updateOptions(context.options);
      };
    };

module.exports = Backbone.View.extend({

  initialize: function(options){
    this.options = options;
    this.updateItem = updateItem(this);
    this.updateOptions = updateOptions(this);

    this.updateOptions(options);
    console.log("[userListVw.js:40] initialized");
  },

  render: function(){
    var self = this;
    if(this.usersShort.models.length > 0)
    {
      __.each(this.usersShort.models, function (item)
      {
        self.renderItem(item);
      }, this);
    }else{
      self.renderNoneFound();
    }
  },

  renderItem: function(item){
    var storeShort = new userShortView({
      model: item
    });
    this.subViews.push(storeShort);
    //$el must be passed in by the constructor
    this.$el.append(storeShort.render().el);
  },

  renderNoneFound: function(){
    var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    this.subViews.push(simpleMessage);
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.remove();
      }
    });
    this.remove();
  }
});

