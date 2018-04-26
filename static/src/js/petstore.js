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

odoo.define('oepetstore', function(require){
    'use strict';

    var AbstractAction = require('web.AbstractAction');
    var Widget = require('web.Widget');
    var WebClient = require('web.WebClient');
    var core = require('web.core');

    console.log(" PETSTORE.JS loaded");

    var HomePage = AbstractAction.extend({
        start : function(){
            console.log("pet store home page loaded");
        }
    });

    core.action_registry.add('petstore.homepage',HomePage);
})
