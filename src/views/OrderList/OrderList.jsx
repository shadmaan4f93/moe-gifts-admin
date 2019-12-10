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
import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import axios from 'axios';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import PlainTable from "components/Table/Table.jsx";
import Table from "components/Table/KusTable.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import { yellow } from "@material-ui/core/colors";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

function OrderList(props) {
  const { classes } = props;
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const result = await axios(
      'https://moe-gifts-api.herokuapp.com/orders',
    );
    setOrder(result.data.data);
  }

  const getTableData = () => {
    if (order.length > 0)
      return order.map(item => {
        return {
          orderId: item.orderId,
          userId: item.userId,
          createdAt: item.createdAt,
          modifiedAt: item.modifiedAt,
          total: item.total
        }
      })
    return [];
  }

  const getOrderItemDetails = (data) => {
    return (data.orderItems).map(item => {
      return [`${item.name}`, `${item.id}`, `${item.quantity}`, `${item.price}`, `${item.total}`]
    })
  }

  const showDetailsPanelDataHandler = (rowData) => {
    const selectedRowData = order.find(x => x.orderId === rowData.orderId);
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" style={{ height: "50px" }}>
            <h4 className={classes.cardTitleWhite}>
              Order Details
            </h4>
          </CardHeader>
          <CardBody>
            <p><strong>Order ID</strong>: {selectedRowData.orderId}</p>
            <p>
              <strong>Created At</strong>: {selectedRowData.createdAt}
            </p>
            <p>
              <strong>Modified At</strong>: {selectedRowData.modifiedAt}
            </p>

            <strong>Order Item</strong>
            <PlainTable
              tableHead={["Name", "Product ID", "Quantity", "Price", "Total"]}
              tableData={getOrderItemDetails(selectedRowData)}
              hidePagination={true}
            />
            <p>
              <strong>User ID</strong>: {selectedRowData.userId}
            </p>
            <p>
              <strong>Total: <span style={{ fontWeight: "bold" }}>{selectedRowData.total}</span></strong>
            </p>
          </CardBody>
        </Card>

      </GridItem>
    )
  }

  const deleteHandler = (event, rowData) => {
    event.persist();
    console.log(event);
    const url = "http://moe-gifts-api.herokuapp.com/order/del/" + rowData.orderId;
    axios.delete(url).then(response => { fetchData(); }).catch(err => console.log(err));
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Orders</h4>
          </CardHeader>
          <CardBody>
            <Table
              showDetailsPanelDataHandler={showDetailsPanelDataHandler}
              tableHeaderColor="primary"
              showDatailOptions={true}
              tableHead={[
                { title: 'Order ID', field: "orderId" },
                { title: 'User ID', field: 'userId' },
                { title: 'Created At', field: 'createdAt' },
                { title: 'Modified At', field: 'modifiedAt' },
                { title: 'Total', field: 'total' }]}
              tableData={getTableData()}
              actions={[{
                type: "delete",
                onClick: (event, rowData) => deleteHandler(event, rowData),
                tooltip: "delete order"
              }]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

OrderList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(OrderList);
