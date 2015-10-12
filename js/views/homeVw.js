var __ = require('underscore'),
    Backbone = require('backbone'),
    Moment = require('moment'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),//TODO: Remove FS - it is not used?
    loadTemplate = require('../utils/loadTemplate'),
    itemListView = require('./itemListVw'),
    itemList,
    storeListView = require('./userListVw'),
    storeList,
    ws,
    wsUrl = 'ws://localhost:18466',
    wsConnected,
    useFakeStores = true,
    useFakeListings = true;

var fakeStores = [

  {
    "vendor": {
      "handle": "@artstudio",
      "name": "An Art Studio",
      "nsfw": true,
      "short_description": "Art Studio",
      "avatar_hash": "32f7a0445c83a5a2c05a2f27015f9bc366d68b7e",
      "guid": "5e415e86ab3314168a77f714ff0a67c4f7644609"
    },
    "id": "34cd5975bf5b4fa0b2db4c49dbf9a0c4e96e8b00"
  }
];

var fakeItems = [
  {
    "id": "24cd5975bf5b4fa1b2db4c49dbf9a0c4e96e8b11",
    "listing": {
      "contract_hash": "2fefc6d167eb0e21ae0019821a64c59771d830fc",
      "category": "Test",
      "nsfw": false,
      "title": "Test Item One",
      "thumbnail_hash": "a8a38198fbfba2cfb6c45f16a3b0cb44ef769414",
      "price": 12,
      "origin": "UNITED_STATES",
      "currency_code": "usd",
      "ships_to": [
        "UNITED_STATES"
      ],
      "userCurrencyCode": "USD",
      "server": "http://localhost:18469/api/v1/",
      "showAvatar": true,
      "avatar_hash": "",
      "handle": "test user 1",
      "guid": "1234"
    }
  }
];

function wsConnect() {
  if (!wsConnected) {
    console.log("[homeVw.js:117] connecting..");
    ws = new WebSocket(wsUrl);
    ws.onopen = wsOnOpen;
    ws.onclose = wsOnClose;
    ws.onmessage = wsOnMessage;
  }
}


function wsOnOpen() {
  var getVendorsRequest = {
    "request": {
      "api": "v1",
      "id": Math.random().toString(36),
      "command": "get_vendors"
    }
  };
  var getHomepageListingsRequest = {
    "request": {
      "api": "v1",
      "id": Math.random().toString(36),
      "command": "get_homepage_listings"
    }
  };

  console.log("[homeVw.js:125] OPENED CONNECTION");
  wsConnected = true;
  if (useFakeStores) {
    storeList.updateItem(fakeStores[0]);
  } else {
    ws.send(JSON.stringify(getVendorsRequest));
  }
  if (useFakeListings) {
    itemList.updateItem(fakeItems[0]);
  } else {
    ws.send(JSON.stringify(getHomepageListingsRequest));
  }
}

function wsOnMessage(evt)
{
  console.log("[homeVw.js:131] incoming store");
  var dataObj = JSON.parse(evt.data);
  if(dataObj.vendor) { //store
    storeList.addItem(dataObj);
  }
}

function wsOnClose()
{
  wsConnected = false;
  console.log("[homeVw.js:133] Websockets closed!");
}
module.exports = Backbone.View.extend({

  className:"homeView",

  events: {
    'click .js-homeItemsBtn': 'homeItemsClick',
    'click .js-homeStoresBtn': 'homeStoresClick'
  },

  initialize: function(options){
    var self = this;
    var postRender = function() {
      wsConnect();
    };
    this.options = options || {};
    this.subViews = [];
    this.render(postRender);
  },

  hideList1: function(e){
    $('.js-list1').show();
    $('.js-list2').hide();
    $('.js-homeItemsBtn').addClass('active');
    $('.js-homeStoresBtn').removeClass('active');
  },

  hideList2: function(e){
    $('.js-list1').hide();
    $('.js-list2').show();
    $('.js-homeItemsBtn').removeClass('active');
    $('.js-homeStoresBtn').addClass('active');
  },

  render: function(callback){
    var self = this;
    $('#content').html(this.$el);
    loadTemplate('./js/templates/home.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate());
      self.subRender();
      callback();
    });
  },

  subRender: function(){
    itemList = new itemListView({model: [], el: '.js-list1', userModel: this.options.userModel, showAvatar: true});
    storeList = new storeListView({model: [], el: '.js-list2'});

    this.subViews.push(itemList, storeList);
    this.hideList1();
    //render current date
    $('.js-currentDate').html(Moment().format('MMMM Do, YYYY'));
  },

  homeItemsClick: function(e){
    this.hideList1();
  },

  homeStoresClick: function(e){
    this.hideList2();
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
