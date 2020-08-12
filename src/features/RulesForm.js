import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form'
import {
  updateElement
} from './rulesSlice';


const RulesForm = (props) => {
  debugger;
  const dispatch = useDispatch();
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const onSubmit = async values => {
    await sleep(300);
    dispatch(updateElement({...values}));
  }
  const captialize = value => value.charAt(0).toUpperCase() + value.slice(1);
  const required = value => (value ? undefined : 'Required');
  const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);
  const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

  return (
    <div className="container">
      <Form
        onSubmit={onSubmit}
        initialValues={props}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className="mt-3">
            <Field
              name="name"
              validate={required}
            >
            {({ input, meta }) => (
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-6">
                <input {...input} type="text" className={`form-control ${meta.error && meta.touched  ? "is-invalid" : ""}`}  placeholder="name" />
                {meta.error && meta.touched && <span className="invalid-feedback">{meta.error}</span>}
                </div>
              </div>
            )}
          </Field>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Type</label>
            <div className="col-sm-6">
              <Field name="type" className="form-control" component="select">
                  <option value="string">string</option>
                  <option value="decimal">decimal</option>
                  <option value="integer">integer</option>
                  <option value="boolean">boolean</option>
                  <option value="date">date</option>
                  <option value="time">time</option>
              </Field>
              </div>
          </div>
          {Object.entries(props).map((prop,i)=> {
            if(prop[0]==="name" || prop[0]==="type" || prop[0]==="_path")
              return;
            else
              return (
                <div key={i}>
                  <Field
                      name={prop[0]}
                      validate={required}
                    >
                    {({ input, meta }) => (
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">{captialize(prop[0])}</label>
                        <div className="col-sm-6">
                        <input {...input} type="text" className={`form-control ${meta.error && meta.touched  ? "is-invalid" : ""}`}  placeholder={prop[0]}/>
                        {meta.error && meta.touched && <span className="invalid-feedback">{meta.error}</span>}
                        </div>
                      </div>
                    )}
                  </Field>
                </div>
              )
          })}
          <div className="buttons m-3">
            <button type="submit" className="btn btn-primary btn-lg mr-3" disabled={submitting || pristine}>
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-lg ml-3"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
          </form>
        )}
      />
    </div>
  )
}

export default RulesForm;
