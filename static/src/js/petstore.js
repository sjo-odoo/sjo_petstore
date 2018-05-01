// openerp.oepetstore = function(instance, local) {
//     var _t = instance.web._t,
//         _lt = instance.web._lt;
//     var QWeb = instance.web.qweb;

//     local.HomePage = instance.Widget.extend({
//         start: function() {
//             console.log("pet store home page loaded");
//         },
//     });

//     instance.web.client_actions.add('petstore.homepage', 'instance.oepetstore.HomePage');
// }

// LEARN _this.rpc()

odoo.define('oepetstore', function(require){
    'use strict';

   // var WebClient = require('web.WebClient');
    var AbstractAction = require('web.AbstractAction');
    var Widget = require('web.Widget');

    var core = require('web.core');
    var QWeb = core.qweb;
   // var BasicModel = require('web.BasicModel');
   /// var field_registry = require('web.field_registry');


    var AbstractField = require('web.AbstractField');

    //console.log(" PETSTORE.JS loaded");

    // var Char2Field = AbstractField.extend({
    //     init : function(){
    //         this._super.apply(this,arguments);
    //         this.set("value","");
    //     },
    //     start : function(){
    //         //this.display_field();
    //         return this._super();
    //     },
    //     display_field = function(){
    //         var self = this;
    //         self.$el.html(QWeb.render("FieldChar2"));
    //     },
    //     render_value : function(){
    //         this.$el.text(this.get("value"));
    //     }
    // });

    var GreetingsWidget = AbstractAction.extend({
        className :'oe_petstore_homepage',
        init : function(parent,name){
            this._super;
            // When overriding the init() method of a widget it is of the utmost importance to pass the parent to the this._super() call,
            // otherwise the relation will not be set up correctly:
            this.name = name;
        },
        start : function(){
            this.$el.append("<div>We are so happy to see you again in this menu!</div");
            console.log(this.getParent().$el);
        },
    })
   

    var ConfirmWidget = AbstractAction.extend({
        events :{
            'click button.ok_button' : function(){
                this.trigger('user_chose',true);
            },
            'click button.cancel_button' : function(){
                this.trigger('user_chose',false);
            }
        },
        start : function(){
            this.$el.append(QWeb.render('confirm_widget'));
        }
    })

    var ColorInputWidget = AbstractAction.extend({
        template : 'colorInputWidget',
        events : {
            'change input':'input_changed'
        },
        start : function(){
            this.input_changed();
            return this._super();
        },
        input_changed : function(){
            var color = ["#",
                this.$(".oe_color_red").val(),
                this.$(".oe_color_green").val(),
                this.$(".oe_color_blue").val()        
            ].join('');
            console.log("color inside input_changed is"+color);
            this.set('color',color);
        },
    });




 

    // When using Widget()'s integration it is not possible to provide additional data to the template. The template will be given a single widget context variable,
    //  referencing the widget being rendered right before start() is called (the widget's state will essentially be that set up by init()):





    // To inject HTML in the page being rendered, use t - raw.Like t - esc it takes an arbitrary Javascript expression as parameter, 
    // but it does not perform an HTML - escape step.
    

    // Defining attributes
    // QWeb provides two related directives to define computed attributes: t - att - name and t - attf - name.
    // In either case, name is the name of the attribute to create(e.g.t - att - id defines the attribute id after rendering).
    // t - att - takes a javascript expression whose result is set as the attribute's value, it is most useful if all of the attribute's value is computed:
    // <div>
    //     Input your name:
    //     <input type="text" t-att-value="defaultName" />
    // </div>

    // t - attf - takes a format string.A format string is literal text with interpolation blocks inside, an interpolation block is a javascript expression between { { and } },
    //  which will be replaced by the result of the expression.
    // It is most useful for attributes which are partially literal and partially computed such as a class:
    // <div t-attf-class="container {{ left ? 'text-left' : '' }} {{ extra_class }}">
    //     insert content here
    // </div>

    // QWeb provides two related directives to define computed attributes: t - att - name and t - attf - name.
    // In either case, name is the name of the attribute to create(e.g.t - att - id defines the attribute id after rendering).
    
    
    var HomePage = AbstractAction.extend({
        //className : 'oe_petstore_greetings',
        //template : 'HomePageTemplate',
        template : "HomePage",
        // init : function(parent){
        //     this._super(parent);
        //     this.name = "Mordecai";
        // },
        start: function () {
            
//             //console.log("pet store home page loaded");
//             //this.$el.append("<div>Hello dear Odoo user!</div>");
//             // //this.$el.append(QWeb.render("HomePageTemplate"))
//   // Doubt   //  var products = ["cpu","mouse","keyboard","graphic card","screen"];
//             //  var product_widget = new ProductsWidget(this,products,"#00FF00");       //The first argument is this, which in that case was a HomePage instance.This tells the widget being created which other widget is its parent.
//             var products = new ProductsWidget(this, ["cpu", "mouse", "keyboard", "graphic card", "screen"], "#00FF00" );
//             products.appendTo(this.$el);

//             // var ConfirmWidget = new ConfirmWidget(this);
//             // ConfirmWidget.on("user_chose",this,this.user_chose);
//             // ConfirmWidget.appendTo(this.$el);

//             // user_chose : function(confirm){
//             //     if(confirm){
//             //         console.log("The user agreed to continue");
//             //     }
//             //     else{
//             //         console.log("The user refused to continue");
//             //     }
//             // }
//             // var greeting = new GreetingsWidget(this);
//             // // return greeting.appendTo(this.$el); 
//             // greeting.appendTo(this.$el); 
//             // console.log(this.getChildren()[0].$el);
//             // var self = this;        // ask why this cause problem
//             //----> Answer
//             // While this works it has a few issues:

//             // it is rather verbose
//             // it does not support replacing the widget's root element at runtime as the binding is only performed when start() is run (during widget initialization)
//             // it requires dealing with this - binding issues
            var self = this;
           
//             // // loading modules
             self._rpc({model : "oepetstore.message_of_the_day", method : "my_method", args : ""}).then(function(result){
                 self.$el.append("<div>Hello " + result + "</div>");
             });
//            // var self = this;

                // self.colorInput = new ColorInputWidget(this);
                // self.colorInput.on("change:color",this,this.color_changed);
    //          //return self.colorInput.appendTo(this.$el);
             return $.when(
                new PetToysList(this).appendTo(this.$('.oe_petstore_homepage_left')),
                new MessageOfTheDay(this).appendTo(this.$('.oe_petstore_homepage_right'))
            );
            //return new MessageOfTheDay(this).appendTo(this.$el);
            //return self.$el.append(QWeb.render('PetToysList'));
    
        },
        
        color_changed : function(){
            console.log(this.colorInput.get("color"));
            //self.$(".oe_color_div").css("background-color",this.colorInput.get("color"));
            self.$(".oe_color_div").css("background-color", this.colorInput.get("color"));

        }
    });

    //When a widget is destroyed it will first call destroy() on all its children.
    var ProductsWidget = AbstractAction.extend({
        template: 'ProductsWidget',
        init: function (parent, products, color) {
            this._super(parent);
            this.products = products;
            this.color = color;
        },
    });


    // widget to display last record name of the oepetstore.message_of_the_day
    var MessageOfTheDay = AbstractAction.extend({
        template: "MessageOfTheDay",
        start: function () {
            var self = this;
            return self._rpc({ model: "oepetstore.message_of_the_day", method: "my_method" }).then(function (result) {
                self.$(".oe_mywidget_message_of_the_day").text(result);
            });
        },
    });

    var PetToysList = AbstractAction.extend({
        template: 'PetToysList',
        events: {
            'click .oe_petstore_pettoy': 'selected_item',
        },
        start: function () {
            var self = this;
            return self._rpc({ model: "product.product", method: "my_method" }).then(function (results) {
                //self.$(".oe_mywidget_message_of_the_day").text(result['hello']);
                // display last all items in the product.product
                var i=1;
                //console.log(results.length);
                _.each(results,function(item){
                    //console.log(item['display_name'])
                    self.$el.append(QWeb.render('PetToy', {
                        item: {
                            "name": item['display_name'] , "image": item['image']}}));
                })
                //self.$el.append(QWeb.render('PetToy'));
            });
        },
        selected_item: function (event) {
            //console.log("BUtton clicked");
            console.log($(event.currentTarget).data.res_id)
            console.log($(event))
            this.do_action({
                type: 'ir.actions.act_window',
                res_model: 'product.product',
                // $(event.currentTarget).data('res-id')
                res_id: 47,
                views: [[false, 'form']],
            });
        },
    });
//     Widget's jQuery Selector
//     Selecting DOM elements within a widget can be performed by calling the find() method on the widget's DOM root:

//     this.$el.find("input.my_input")...
//     But because it's a common operation, Widget() provides an equivalent shortcut through the $() method:

// local.MyWidget = instance.Widget.extend({
//         start: function () {
//             this.$("input.my_input")...
//     },
// });
// Warning
// The global jQuery function $() should never be used unless it is absolutely necessary: selection on a widget's root are scoped to the widget and local to it, but selections with $() are global to the page/application and may match parts of other widgets and views, leading to odd or dangerous side-effects. Since a widget should generally act only on the DOM section it owns, there is no cause for global selection.

//trigger() takes the name of the event to trigger as its first (mandatory) argument, any further arguments are treated as event data and passed directly to listeners.

///Triggering events on an other widget is generally a bad idea. The main exception to that rule is odoo.web.bus which exists specifically to broadcasts evens in which any widget could be interested throughout the Odoo web application.

/*

The class system of the Odoo web framework allows direct modification of existing classes using the include() method:

var TestClass = instance.web.Class.extend({
    testMethod: function() {
        return "hello";
    },
});

TestClass.include({
    testMethod: function() {
        return this._super() + " world";
    },
});

console.log(new TestClass().testMethod());
// will print "hello world"
*/

    var TrainRouteWidget = AbstractAction.extend({
        init : function(){

        },
        start : function(){

        },
    });

     var WidgetHomepage = AbstractAction.extend({
        template: 'WidgetHomepage',
        start: function () {
            // var self = this;
            // self.colorInput = new ColorInputWidget(this);
            // self.colorInput.on("change:color", this, this.color_changed);
            // self.colorInput.appendTo(this.$el);

            // console.log("WidgetHomepage loaded");
            // var products = ["cpu","mouse","keyboard","graphic card","screen"];
            // var product_widget = new ProductsWidget(this,products,"#00FF00");       //The first argument is this, which in that case was a HomePage instance.This tells the widget being created which other widget is its parent.
            // var products = new ProductsWidget(this, ["cpu", "mouse", "keyboard", "graphic card", "screen"], "#00FF00" );
            // products.appendTo(this.$el);

            
        },

         color_changed: function () {
            var self =this;
            //console.log(self.colorInput.get("color"));
            //self.$(".oe_color_div").css("background-color",this.colorInput.get("color"));
            console.log( self.colorInput.get("color"));

         }
     })

//    field_registry.add('char2',Char2Field);
    core.action_registry.add('petstore.homepage',HomePage);

   

    core.action_registry.add('widget.homepage',WidgetHomepage)

})
