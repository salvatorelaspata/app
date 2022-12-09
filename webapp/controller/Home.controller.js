sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel'],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    'use strict'

    return Controller.extend('app.controller.Home', {
      onInit: function () {
        console.log('Home controller init')
        this.getOwnerComponent()
          .getRouter()
          .getRoute('Home')
          .attachPatternMatched(this._onRouteMatched, this)
      },
      _fetchData: function ({ endpoint }) {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: `https://jsonplaceholder.typicode.com/${endpoint}`,
            type: 'GET',
            success: data => {
              resolve(data)
            },
            error: function (err) {
              reject(err)
            },
          })
        })
      },
      _onRouteMatched: function () {
        console.log('Home route matched')
        $.ajax({
          url: 'https://jsonplaceholder.typicode.com/users',
          type: 'GET',
          success: data => {
            this.getView().setModel(
              new JSONModel({ list: data }),
              'modelloHome'
            )
          },
          error: function (err) {
            console.log(err)
          },
        })

        const fun1 = this._fetchData({ endpoint: 'users' })

        const fun2 = this._fetchData({ endpoint: 'todos' })

        console.log(fun1, fun2)

        Promise.all([fun1, fun2])
          .then(([users, todos]) => {
            console.log({ users, todos })
          })
          .catch(err => {
            console.log(err)
          })
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
      onNavigateToDetail: function (oEvn) {
        // debugger
        const oSelected = oEvn.getParameter('listItem')
        const oBinding = oSelected.getBindingContext('modelloHome')
        const id = oBinding.getProperty('id')
        // const { id: _id } = oBinding.getObject()
        // console.log({ id, _id })
        this.getOwnerComponent().getRouter().navTo('Detail', { id })
      },
    })
  }
)
