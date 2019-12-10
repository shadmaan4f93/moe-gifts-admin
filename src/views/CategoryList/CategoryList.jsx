
import React, { Fragment } from "react";
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
import { Link } from 'react-router-dom'
import CardFooter from "components/Card/CardFooter.jsx";
//import Button from "components/CustomButtons/Button.jsx";
import { useState, useEffect } from 'react';
import axios from 'axios';
import TableSimple from "components/Table/Table.jsx";
import EditCategory from './EditCategory'
import { card } from "assets/jss/material-dashboard-react";
//import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
//import { stringify } from "querystring";
const styles = {
  head: {
    //backgroundColor: black,
    // color: theme.palette.common.white,
  },
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

function CategoryList(props) {

  const [data, setData] = useState();
  const [isEditOpen, setEdit] = useState(false);
  const [isAddOpen, setAdd] = useState(false);
  const [editCategoryRow, setCategoryForEdit] = useState('');
  const { classes } = props;
  const [catInProducts, setProductCategory] = useState();
  //const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    fetchData();
    productDetails();
  }, []);

  async function productDetails() {
    const result = await axios(
      'https://moe-gifts-api.herokuapp.com/products',
    );

    setProductCategory(result.data.data);
  }
  async function fetchData() {
    const result = await axios(
      'https://moe-gifts-api.herokuapp.com/categories/',
    );
      
    setData(result.data.data);
    console.log(result.data.data)
  }

  const addHandler = (event, row) => {
    setEdit(true);
    setAdd(true);

    let emptyCategories = {
      id: '', name: '', description: ''
    }
    //  let newCategoryRow = JSON.stringify(emptyCategories);
    setCategoryForEdit(emptyCategories)


  }
  const getOrderItemDetails = (categoryId) => {
    console.log(JSON.stringify(catInProducts));
    return (catInProducts.filter(x=>x.category == categoryId)).map(item => {
      return [<Link style={styles.link} to="/admin/products">
        {item.name}
      </Link>]
     return [];
    })
  }
  const showDetailsPanelDataHandler = (row) => {
    console.log(row.id);
    return (
      <Card>
        <CardHeader color="primary" style={{ height: "40px" }}>
          <h4 className={classes.cardTitleWhite}>
            Products </h4></CardHeader>
        <CardBody>
          <TableSimple tableHeaderColor="primary" className={classes.table}
           tableHead={["Product Name", ""]} 
           tableData={getOrderItemDetails(row.id)} />
        </CardBody>
      </Card>
    )
    /*return (
     <Table
     addHandler={addHandler}
     updateHandler={updateHandler}
     deleteHandler={deleteHandler}
     showDetailsPanelDataHandler={showDetailsPanelDataHandler}
     showDatailOptions={true}
     addText="add category"
     updateText="edit category"
     deleteText="delete category"
     tableHeaderColor="primary"
     tableHead={[
       { title: 'Name', field: 'name' }
     ]}
     tableData={data}
     clickHandler={rowClickHandler}
   />
    )*/
  }
  const updateHandler = (event, row) => {
    setEdit(true);
    setAdd(false);
    setCategoryForEdit(row);
  }

  const deleteHandler = (e, row) => {
    e.preventDefault();
    let url = "https://moe-gifts-api.herokuapp.com/category/del/" + row.id
    axios.delete(url)
      .then(res => {
        console.log(res.data)
        fetchData()
      })
  }
  const categoryInsert = (categoryAdd) => {

    let url = "https://moe-gifts-api.herokuapp.com/categories/create";
    axios.post(url, categoryAdd)
      .then(res => {
        console.log(res.data)
        fetchData()
      });
  }
  const categoryUpdate = (categoryEdit, Id) => {
    let url = "https://moe-gifts-api.herokuapp.com/Categories/update/" + Id;
    axios.put(url, categoryEdit)
      .then(res => {
        console.log(res.data)
        fetchData()
      });
  }
  const handleEditCategoryChange = (updatedValue) => {
    console.log(updatedValue);
    // 
    //console.log(isAddOpen);
    const categoryAddParams = {
      name: updatedValue.name,
      description: updatedValue.description
    };
    const categoryEditParams = {
      id: updatedValue.id,
      name: updatedValue.name,
      description: updatedValue.description
    };
    (isAddOpen) ? categoryInsert(categoryAddParams) : categoryUpdate(categoryEditParams, updatedValue.id);
    /* let url = "https://moe-gifts-api.herokuapp.com/Categories/update/" + updatedValue.id
     axios.put(url, category)
     .then(res => 
       {
         console.log(res.data)
         fetchData()
       });
 */
    setEdit(false);
  };
  const rowClickHandler = (id) => {
    console.log(id);
    //const selectedOrder = order.find(x => x.orderId === id);
    //setSelectedOrder(selectedOrder);
  }
  const handleEditCategoryCancel = () => {
    setEdit(false);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>

        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              {
                isEditOpen ? (isAddOpen ? "Add Category" : "Edit Category") : "All Categories"
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
                  showDetailsPanelDataHandler={showDetailsPanelDataHandler}
                  showDatailOptions={true}
                  tableHeaderColor="primary"
                  tableHead={[
                    { title: 'Name', field: 'name' },
                    { title: 'Description', field: 'description' }
                  ]}
                  tableData={data}
                  clickHandler={rowClickHandler}
                />
                :
                <Fragment>
                  <EditCategory categoryRow={editCategoryRow}
                    handleDataChanged={handleEditCategoryChange}
                    handleDataCancel={handleEditCategoryCancel}
                    isAdd={isAddOpen}></EditCategory>
                  {/* // <CardFooter>
                  //   <Button color="primary">Update Profile</Button>
                  // </CardFooter> */}
                </Fragment>
            }

          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  );
}

CategoryList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(CategoryList);

/* addHandler={addHandler}
updateHandler={updateHandler}
deleteHandler={deleteHandler}
  addText="add category"
                  updateText="edit category"
                  deleteText="delete category"
 */