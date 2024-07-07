// src/components/UserForm.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';


const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    role: 'Member',
    status: 'Active',
    email: '',
    date: new Date().toISOString().split('T')[0]
  });
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/users/${id}`)
        .then(response => setUser(response.data))
        .catch(error => console.log(error));
    }
  }, [id, isEdit]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    role: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    date: Yup.date().required('Required')
  });

  const onSubmit = (values) => {
    const apiCall = isEdit ? axios.put : axios.post;
    const url = isEdit ? `http://localhost:5000/users/${id}` : 'http://localhost:5000/users';
    
    apiCall(url, values)
      .then(() => navigate('/list'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>{isEdit ? 'Edit User' : 'Add User'}</h1>
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {() => (
          <Form>
            <div className="form-group">
              <label>Name</label>
              <Field name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <Field as="select" name="role" className="form-control">
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <Field as="select" name="status" className="form-control">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Field>
              <ErrorMessage name="status" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label>Date</label>
              <Field name="date" type="date" className="form-control" />
              <ErrorMessage name="date" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;

