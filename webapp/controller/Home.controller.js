sap.ui.define(
  ['sap/ui/core/mvc/Controller'],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    'use strict'

    return Controller.extend('app.controller.Home', {
      onInit: function () {
        console.log('Home controller init')
        this.getOwnerComponent()
          .getRouter()
          .getRoute('Home')
          .attachPatternMatched(this._onRouteMatched, this)
      },
      _onRouteMatched: function () {
        console.log('Home route matched')
      },
      onNavSplit: function () {
        this.getOwnerComponent().getRouter().navTo('Split')
      },
      onNavAnother: function () {
        this.getOwnerComponent().getRouter().navTo('Another')
      },
      onNavParametrica: function (oEvn) {
        const id = oEvn.getSource().data('id')
        this.getOwnerComponent().getRouter().navTo('Parametrica', { id })
      },
    })
  }
)
