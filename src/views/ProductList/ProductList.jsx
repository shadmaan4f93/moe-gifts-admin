
import React, { Fragment, Children } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/KusTable";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Redirect } from 'react-router-dom'
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { useState, useEffect } from 'react';
import axios from 'axios';

import EditProduct from './EditProduct'
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

function ProductList(props) {

  const [data, setData] = useState();
  const [isEditOpen, setEdit] = useState(false);
  const [isAddOpen, setAdd] = useState(false);
  const [editProductRow, setProductForEdit] = useState('');
  const { classes } = props;

  useEffect(() => {

    fetchData();

  }, []);


  async function fetchData() {
   
    const result = await axios(
      'https://moe-gifts-api.herokuapp.com/products',
    );

    setData(result.data.data);
  }

  const addHandler = (event, row) => {
    setEdit(true);
    setAdd(true);
    setProductForEdit('');
  }

  const updateHandler = (event, row) => {
    setAdd(false);
    setEdit(true);
    setProductForEdit(row);
  }

  const deleteHandler = (e, row) => {
    e.preventDefault();
    let url = "https://moe-gifts-api.herokuapp.com/product/del/" + row.id
    axios.delete(url)
      .then(res => {
        console.log(res.data)
        fetchData()
      })
  }
  
  const handleEditProductChange = (updatedValue,datareceived) => {
  //   debugger;
  //   console.log(updatedValue);
  //   const formData = new FormData();
  //  formData.append('ImageUrl', updatedValue.ImageUrl)
  // formData.append('name', updatedValue.name)
  // formData.append('title', updatedValue.title)
  // formData.append('category', updatedValue.category)
   //formData.append('sku', updatedValue.sku)
  // formData.append('description', updatedValue.description)
   //formData.append('active', updatedValue.active)
   //formData.append('new', updatedValue.new)
   //formData.append('sale', updatedValue.sale)
   //formData.append('price', updatedValue.price)
    // const productAddParams = {
    //   name: updatedValue.name,
    //   title:updatedValue.title,
    //   category:updatedValue.category,
    //   price: updatedValue.price,
    //   active: updatedValue.active,
    //   description: updatedValue.description,
    //   sku: updatedValue.sku,
    //   ImageUrl:updatedValue.ImageUrl,
    //   new:updatedValue.new,
    //   sale:updatedValue.sale
    // };
    // const productEditParams = {
    //   id: updatedValue.id,
    //   name: updatedValue.name,
    //   title:updatedValue.title,
    //   category:updatedValue.category,
    //   price: updatedValue.price,
    //   active: updatedValue.active,
    //   description: updatedValue.description,
    //   sku: updatedValue.sku,
    //   ImageUrl:updatedValue.ImageUrl,
    //   new:updatedValue.new,
    //   sale:updatedValue.sale
    // };
    (isAddOpen) ? productsInsert(updatedValue) : productsUpdate(updatedValue, datareceived.id);
    setEdit(false);
  };
  const productsInsert = (formData) => {
   
    let url = "https://moe-gifts-api.herokuapp.com/products/create";
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
      .then(res => {
        console.log(res.data)
       fetchData()
      });
  }
  const productsUpdate = (productEdit, Id) => {
     let url = "https://moe-gifts-api.herokuapp.com/products/update/" + Id;
    axios.put(url, productEdit)
      .then(res => {
        console.log(res.data)
        fetchData()
      });
  }
  const handleEditProductCancel = () => {
    setEdit(false);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>

        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              {
                isEditOpen ? "Edit Product" : "All Products"
              }
            </h4>
          </CardHeader>
          <CardBody>
            {
              !isEditOpen ?

                <Table
                actions={[{
                  type: "add",
                  onClick: (event, row) => addHandler(event, row),
                  tooltip: "add category"
                },
                {
                  type: "update",
                  onClick: (event, row) => updateHandler(event, row),
                  tooltip: "edit category"
                },
                {
                  type: "delete",
                  onClick: (event, row) => deleteHandler(event, row),
                  tooltip: "delete category"
                }
                ]}
                //  addHandler={addHandler}
                //  updateHandler={updateHandler}
                //  deleteHandler={deleteHandler}
                  // addText="add product"
                  // updateText="edit product"
                  // deleteText="delete product"
                  tableHeaderColor="primary"
                  tableHead={[
                    { title: 'Image', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} style={{width: 50, borderRadius: '40%'}}/> },
                    { title: 'Name', field: 'name' },
                    { title: 'Title', field: 'title' },
                    { title: 'Price(Usd)', field: 'priceUs' },
                    { title: 'Price(Cad)', field: 'priceCad' },
                    { title: 'Category', field:'name',render:rowData =>rowData.categoryDetails[0]? rowData.categoryDetails[0].name:''},
                    { title: 'Stock Count', field: 'count' },
                  ]}
                 tableData={data}
                />
                :
                <Fragment>
                  <EditProduct productRow={editProductRow}
                    handleDataChanged={handleEditProductChange}
                    handleDataCancel={handleEditProductCancel}
                    isAdd={editProductRow.id === ""}></EditProduct>
                  {/* <CardFooter>
                    <Button color="primary">Update Profile</Button>
                  </CardFooter> */}
                </Fragment>
            }

          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  );
}

ProductList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ProductList);
