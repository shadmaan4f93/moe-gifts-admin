/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Category Page: https://www.creative-tim.com/Category/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
//import Check from "@material-ui/icons/Check";
//import avatar from "assets/img/faces/marc.jpg";
//import Checkbox from "@material-ui/core/Checkbox";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import { useState, useEffect } from 'react';

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

function EditCategory(props) {
 
    const { classes, categoryRow, handleDataChanged, handleDataCancel, isAdd } = props;
    const [datareceived, setDatareceived] = useState(categoryRow);


    const handleChanged = (e) => {
       const { name, value, type, checked } = e.target;
        type === "checkbox" ?

            setDatareceived(
                {
                    ...datareceived,
                    [e.target.name]: checked
                })
            :
            setDatareceived(
                {
                    ...datareceived,
                    [e.target.name]: value
                });
    }

//console.log(isAdd);

    const handleUpdate = () => {
       
        handleDataChanged(datareceived)
    }
    const handleCancel = () => {
        handleDataCancel()
    }
//console.log(isAdd);
    return (
        <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>  
                    <TextField
                        id="name"
                        name="name"
                        label="Category Name"
                        className={classes.textField}
                        value={datareceived.name}
                        onChange={handleChanged}
                        margin="normal"
                    />
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel>Description</InputLabel>
                  <Input
                    id="description"
                    name="description"
                    value={datareceived.description}
                    multiline={true}
                    // formControlProps={{
                    //   fullWidth: true
                    // }}
                    // inputProps={{
                    //   multiline: true,
                    //   rows: 5,
                    //   value: datareceived.description
                    // }}
                    onChange={handleChanged}
                  />
                </GridItem>
              </GridContainer>
              
            <CardFooter>
                <Button color="primary" onClick={handleUpdate} >Save</Button>
                <Button color="primary" onClick={handleCancel} >Cancel</Button>
            </CardFooter>
        </CardBody>

    );
}

EditCategory.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(EditCategory);
