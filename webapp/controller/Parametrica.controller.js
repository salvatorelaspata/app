sap.ui.define(
  ['sap/ui/core/mvc/Controller'],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    'use strict'

    return Controller.extend('app.controller.Parametrica', {
      onInit: function () {
        console.log('Parametrica controller init')
        this.getOwnerComponent()
          .getRouter()
          .getRoute('Parametrica')
          .attachPatternMatched(this._onRouteMatched, this)
      },
      _onRouteMatched: function (oEvent) {
        console.log('Parametrica route matched')
        debugger
        const args = oEvent.getParameter('arguments')
        console.log(args.id)
        this.getView().setModel(
          new sap.ui.model.json.JSONModel({
            id: args.id,
          }),
          'modello'
        )
      },
    })
  }
)
