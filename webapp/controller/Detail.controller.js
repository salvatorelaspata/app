sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel'],
  function (Controller, JSONModel) {
    'use strict'

    return Controller.extend('app.controller.Detail', {
      onInit: function (oEvn) {
        console.log('Detail controller init')
        this.getOwnerComponent()
          .getRouter()
          .getRoute('Detail')
          .attachPatternMatched(this._onRouteMatched, this)
      },
      _onRouteMatched: function (oEvn) {
        console.log('Detail route matched')
        debugger
        const { id } = oEvn.getParameter('arguments')
        this.getView().setModel(new JSONModel({ id }), 'modelloDetail')
        $.ajax({
          url: `https://jsonplaceholder.typicode.com/users/${id}`,
          type: 'GET',
          success: data => {
            // this.getView().setModel(new JSONModel(data), 'modelloDetail')
            console.log(data)
            this.getView()
              .getModel('modelloDetail')
              .setData({
                ...data,
                _editablegeneral: false,
                _editablecompany: false,
                _editableaddress: false,
              })
          },
        })
      },
      onModifyDetail: function (oEvn) {
        const sSection = oEvn.getSource().data('section')
        const oModel = this.getView().getModel('modelloDetail')
        if (sSection === 'ALL') {
          oModel.setProperty(
            '/_editablegeneral',
            !oModel.getProperty('/_editablegeneral')
          )
          oModel.setProperty(
            '/_editablecompany',
            !oModel.getProperty('/_editablecompany')
          )
          oModel.setProperty(
            '/_editableaddress',
            !oModel.getProperty('/_editableaddress')
          )
          return
        }
        const bEdit = oModel.getProperty('/_editable' + sSection)
        oModel.setProperty('/_editable' + sSection, !bEdit)
      },
    })
  }
)
