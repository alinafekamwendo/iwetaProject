import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import './createKhola.css';
import Notifications from '../Notifications';

function CreateKhola() {
  let { id } = useParams();
  const[userId, setUserId] = useState();
  const [isDisabled,setIsDisabled]=useState(false);
  const { authState } = useContext(AuthContext);
  const [notify, setNotify] = useState({isOpen: false, message:"", type:""})

const [value, setValue] = React.useState("");


  let navigate = useNavigate();
  const initialValues = {
    KholaName: "",
    Location: "",
    AnimalType: "",
    Breed:"",
    Number: "",
    DateOfBirth:""
  };

  useEffect(()=>{
    setUserId(localStorage.getItem("id"))
}, [])


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate( "/home");
     
    }
  }, []);
  const validationSchema = Yup.object().shape({
    KholaName: Yup.string().required("You must input a Khola Name!"),
    Location: Yup.string().required(),
    AnimalType: Yup.string().required(),
    Breed: Yup.string().required(),
    Number: Yup.string().required(),
    DateOfBirth: Yup.date().required()
  });

  const onSubmit = (data) => {
    setNotify({
      isOpen:true,
      message: 'Submitted Suceessfully',
      type: 'success'
    
    })
   var id = localStorage.getItem("id");
   console.log(data);
    axios
      .post(`http://localhost:3001/khola/create/${id}`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/kholaPage");
      });
  };

  function handleChange(e) {
    setValue(e.target.value);
   setIsDisabled(true);
}

  return (
    <div className="createPostPage">
      <p>Create Your Khola</p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Khola Name: </label>
          <ErrorMessage name="KholaName" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="KholaName" 
          />
           <label>Location: </label>
          <ErrorMessage name="Location" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Location"
          />

          <label>Animal Type: </label>
          <ErrorMessage name="AnimalType" component="span" />
          <Field
            component="select"
            autocomplete="off" 
            id="inputCreatePost"
            name="AnimalType"
            
          >
            <option  value="choose">Select type</option>
            <option value="cattle">Cattle</option>
            <option value="pig">Pig</option>
          </Field>
          <label>Breed: </label>
          <ErrorMessage name="Breed" component="span" />
          <Field
            component="select"
            autocomplete="off"
            id="inputCreatePost"
            name="Breed"
          >
            <option value="choose">Select breed</option>
            <option value="beef">Beef</option>
            <option value="dairy">Dairy</option>
            <option value="pig">Pig</option>
            </Field>
        <label>Number of Animal: </label>
          <ErrorMessage name="Number" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            type="number"
            name="Number"
          />
        <label>Date of Birth: </label>
          <ErrorMessage name="DateOfBirth" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            type="date"
            name="DateOfBirth"
          />
          <button type="submit" style={{cursor: "pointer"}}> Create Khola</button>
          {/* ********************************** * */}
          <Notifications
          notify={notify}
          setNotify={setNotify}
          />
 {/* *************************************       */}
    
        </Form>
      </Formik>
    </div>
  );
}

export default CreateKhola;