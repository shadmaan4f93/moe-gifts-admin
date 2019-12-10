/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
//import React from "react";
import React from 'react'
//import PropTypes from "prop-types";
//import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
//import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
//class PositioningActionsColumn extends React.Component {

function KusTable({ ...props }) {
  const { title, tableHead, tableData, actions = [] } = props;

  const tableActions = {
    add: {
      icon: "add",
      isFreeAction: true
    },
    update: {
      icon: "edit",
      isFreeAction: false
    },
    delete: {
      icon: "delete",
      isFreeAction: false
    }
  }

  // NOTE: Please use "event.persist()" to make event object available to the handler. 
  /* Sample for actions object to be passed from parent component:
      actions={[
        { type: "add",
          onClick: (event, row) => addHandler(event, row),
          tooltip: "add order"
          ...
        }
      ]}
  */
 
  const getActions = () => {
    if (actions.length > 0) {
      return actions.map(actionItem => {
        switch (actionItem.type) {
          case "add": {
            let actionObj = { ...tableActions.add, ...actionItem };
            delete actionObj.type;
            return actionObj;
          }
          case "update": {
            let actionObj = { ...tableActions.update, ...actionItem };
            delete actionObj.type;
            return actionObj;
          }
          case "delete": {
            let actionObj = { ...tableActions.delete, ...actionItem };
            delete actionObj.type;
            return actionObj;
          }
          default:
            return [];
        }
      })

    }
    return [];
  }

  return (
    <MaterialTable
      title={title ? title : ""}
      columns={tableHead}
      data={tableData}
      actions={getActions()}
      options={{
        actionsColumnIndex: -1,
      }}
      detailPanel={
        (props.showDatailOptions) ?
          rowData => {
            return props.showDetailsPanelDataHandler(rowData)
          }
          :
          false
      }
    />
  )
}

export default withStyles(tableStyle)(KusTable);
