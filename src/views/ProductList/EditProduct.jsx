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
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import FormControl from '@material-ui/core/FormControl';
import Button from "components/CustomButtons/Button.jsx";
import Select from '@material-ui/core/Select';
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from "axios"
import { EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function EditProduct(props) {
  let fileUpload = null;
  const [catgoryName, setcatgoryName] = React.useState();
  const { classes, productRow, handleDataChanged, handleDataCancel, isAdd } = props;
  const [datareceived, setDatareceived] = useState(productRow);
  const [categoryData, setCategoryData] = useState([]);
  const [imgSource, setimgSource] = useState([]);
  const [name, setName] = useState({
    value: datareceived.name ? datareceived.name : "",
    isTouched: false,
    isInvalid: false,
    id: "name"
  });
  const [title, setTitle] = useState({
    value: datareceived.title ? datareceived.title : "",
    isTouched: false,
    isInvalid: false,
    id: "title"
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [editorState, setEditorState] = React.useState(// EditorState.createEmpty()    
    productRow && productRow.description ? EditorState && EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(productRow.description)
      )
    ) : EditorState.createEmpty()
  );
  useEffect(() => {

    fetchData();
    setimgSource(datareceived.imageUrl ? datareceived.imageUrl : require('../../assets/img/product-placeholder.png'))
  }, []);

  async function fetchData() {
    const result = await axios(
      'https://moe-gifts-api.herokuapp.com/categories/',
    );

    setCategoryData(result.data.data);
    setcatgoryName(datareceived ? datareceived.category : '')
    console.log(result.data.data)
  }
  const blurHandler = (event) => {
    const isValid = validateFields([{ value: event.target.value, id: event.target.id }]);
    if (event.target.id === "name") {
      setName({ ...name, isTouched: true, isInvalid: !isValid, value: event.target.value });
    }
    if (event.target.id === "title") {
      setTitle({ ...title, isTouched: true, isInvalid: !isValid, value: event.target.value });
    }
  }
  const handleChanged = (e) => {
    if (e.target) {
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
    else if (e.blocks) {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      setDatareceived(
        {
          ...datareceived,
          // ['description']: e.blocks[0].text
          ['description']: draftToHtml(rawContentState)
        });
    }

  }
  function handledropChange(event) {
    setcatgoryName(event.target.value);
    setDatareceived(
      {
        ...datareceived,
        [event.target.name]: event.currentTarget.id
      })
  }
  const validateFields = (fields) => {
    let isValid = true;
    fields.map((item, index) => {
      const abc = item.value.trim() ? true : false;
      isValid = abc && isValid;
      if (!isValid && item.id == "name" && !abc) {
        setName({ ...name, isTouched: true, isInvalid: true });
      }
      else if (!isValid && item.id == "title" && !abc) {
        setTitle({ ...title, isTouched: true, isInvalid: true });
      }
    })
    return isValid;
  }
  const handleUpdate = () => {
    const fields = [name, title]
    const isFormValid = validateFields(fields);
    if (isFormValid) {
      var formData = new FormData();
      formData.append('imageUrl', datareceived.imageUrl)
      formData.append('name', datareceived.name)
      formData.append('title', datareceived.title)
      formData.append('category', datareceived.category)
      formData.append('sku', datareceived.sku ? datareceived.sku : '')
      formData.append('description', datareceived.description ? datareceived.description : '')
      formData.append('active', datareceived.active ? datareceived.active : false)
      formData.append('new', datareceived.new ? datareceived.new : false)
      formData.append('sale', datareceived.sale ? datareceived.sale : false)
      formData.append('priceUs', datareceived.priceUs ? datareceived.priceUs : 0)
      formData.append('priceCad', datareceived.priceCad ? datareceived.priceCad : 0)
      formData.append('id', datareceived.id)
      formData.append('count', datareceived.count ? datareceived.count : 0)
      handleDataChanged(formData, datareceived)
    }
    else {
      setIsFormValid(false);
    }
  }
  const handleCancel = () => {
    handleDataCancel()
  }
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  };
  const fileSelectHandler = (event) => {

    const files = event.target.files[0]

    setimgSource(URL.createObjectURL(event.target.files[0]))
    setDatareceived(
      {
        ...datareceived,
        [event.target.name]: files
      })
    // axios.post('https://moe-gifts-api.herokuapp.com/product/images/', formData,
    //   {
    //     onUploadProgress: progressEvent => {
    //       console.log('upload progress:' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });

    // console.log(event.target.files[0])

  }

  // const fileUploadHandler = (event) => {;
  //   const formData = new FormData();
  //   formData.append('image', event.target.files[0], event.target.files[0].name)
  //   axios.post('', formData,
  //     {
  //       onUploadProgress: progressEvent => {
  //         console.log('upload progress:' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
  //       }
  //     })
  //     .then(res => {
  //       console.log(res);
  //     });

  // }

  // const onclickImage=()=>{
  //   this.inputElement.click();
  // }

  const handleImageClick = () => {
    fileUpload.click();
  }

  // const getIds = () => {
  //   if (datareceived) {
  //     return [datareceived.categoryid]
  //   }
  //   return [];
  // }

  return (
    <CardBody>

      {/* Product Name, SKU, Category */}
      <GridContainer>

        <GridItem xs={12} sm={6} md={4}>
          <TextField
            id="name"
            label="Product Name"
            name="name"
            className={classes.textField}
            value={datareceived.name}
            onChange={handleChanged}
            onBlur={blurHandler}
            margin="normal"
            error={name.isTouched && name.isInvalid}
          />
          <div hidden={!(name.isTouched && name.isInvalid)} style={{ marginTop: "-15px", fontSize: "0.75em", color: "red" }}>Please enter a name</div>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <TextField
            id="sku"
            label="SKU"
            name="sku"
            className={classes.textField}
            value={datareceived.sku}
            onChange={handleChanged}
            margin="normal"
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select

              value={catgoryName}
              onChange={handledropChange}
              MenuProps={MenuProps}
              inputProps={{
                name: 'category',
                id: 'categoryid',
              }}
            >
              {categoryData.map(name => {
                return (
                  <MenuItem key={name.id} value={name.id} id={name.id} >
                    {name.name}
                  </MenuItem>
                )
              })
              }
            </Select>
          </FormControl>
        </GridItem>

      </GridContainer>

      {/* Title */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <TextField
            id="title"
            label="Title"
            name="title"
            className={classes.textField}
            value={datareceived.title}
            onChange={handleChanged}
            onBlur={blurHandler}
            margin="normal"
            error={title.isTouched && title.isInvalid}
          />
          <div hidden={!(title.isTouched && title.isInvalid)} style={{ marginTop: "-15px", fontSize: "0.75em", color: "red" }}>Please enter a title</div>
        </GridItem>
      </GridContainer>

      {/* Image, Description */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={5}>
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={fileSelectHandler}
            ref={(input) => { fileUpload = input; }}
            name="imageUrl"
          >
          </input>

          <img src={imgSource}
            width="200"
            height="150"
            onClick={handleImageClick}
            name="imageUrl"
          />

        </GridItem>

        <GridItem xs={12} sm={12} md={7}>
          {/* <TextField
            id="description"
            label="Description"
            name="description"
            multiline
            rowsMax="5"
            style={{ margin: 8 }}
            className={classes.textField}
            value={datareceived.description}
            onChange={handleChanged}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          /> */
            <div>
              <Editor
                placeholder="Enter Description"
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
                onChange={handleChanged}
                id="description"
                label="Description"
                name="description"
              //  initialContentState="jiii"
              // value="hh"
              // html="<p>hh</p>"

              />
              {/* <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          /> */}
            </div>

            // <Editor placeholder='Enter Description' editorState={editorState} onChange={editorState => setEditorState(editorState)} name="description" value={datareceived.description} />

          }
        </GridItem>

      </GridContainer>

      {/* Active, Sale , New, Stock Count */}
      <GridContainer>

        <GridItem xs={12} sm={6} md={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="active"
                checked={datareceived.active}
                onChange={handleChanged}
                value="active"
                color="primary"
              />
            }
            label="Active"
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="new"
                checked={datareceived.new}
                onChange={handleChanged}
                value="new"
                color="primary"
              />
            }
            label="New"
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="sale"
                checked={datareceived.sale}
                onChange={handleChanged}
                value="sale"
                color="primary"
              />
            }
            label="Sale"
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={2}>
          <TextField
            id="stock"
            label="Stock Count"
            value={datareceived.count}
            name="count"
            onChange={handleChanged}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />

        </GridItem>

      </GridContainer>

      {/* Price Us, Price CAD, Stock Count */}
      <GridContainer>

        <GridItem xs={12} sm={6} md={4}>
          <TextField
            id="price"
            label="Price(Usd)"
            name="priceUs"
            value={datareceived.priceUs}
            onChange={handleChanged}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />

        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <TextField
            id="priceCad"
            label="Price(Cad)"
            name="priceCad"
            value={datareceived.priceCad}
            onChange={handleChanged}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>

        </GridItem>

      </GridContainer>


      <CardFooter>
        <Button color="primary" onClick={handleUpdate} >Save</Button>
        <Button color="primary" onClick={handleCancel} >Cancel</Button>
      </CardFooter>
    </CardBody>

  );
}

EditProduct.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(EditProduct);
