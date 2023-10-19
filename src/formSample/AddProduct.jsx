import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const addSupplierValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name boş bırakılmaz!!!"),
    unitPrice: Yup.number().typeError("Unit Price number olmalıdır!!!").required("Unite Price boş bırakılmaz!!!"),
    unitsInStock: Yup.number().typeError("Stock number olmalıdır!!!").min(0, "Stock 0'dan küçük olamaz!!!").required("Stock boş bırakılamaz!!!"),
    quantityPerUnit: Yup.string().required("Quantity Per Unit boş bırakılamaz!!!")
});

function AddProduct() {
    const formik = useFormik({
        initialValues: {
            name: "",
            unitPrice: "",
            unitsInStock: "",
            quantityPerUnit: ""
        },
        validationSchema: addSupplierValidationSchema,
        onSubmit: (values) => {
            axios.post('https://northwind.vercel.app/api/products', values)
                .then(res => {
                    console.log('Success!!');
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                });
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" onChange={formik.handleChange} value={formik.values.name} />
                {formik.touched.name && formik.errors.name ? <p style={{ color: 'red' }}>{formik.errors.name}</p> : <></>}
            </div>
            <div>
                <label htmlFor="unitPrice">Unit Price: </label>
                <input type="text" name="unitPrice" id="unitPrice" onChange={formik.handleChange} value={formik.values.unitPrice} />
                {formik.touched.unitPrice && formik.errors.unitPrice ? <p style={{ color: 'red' }}>{formik.errors.unitPrice}</p> : <></>}
            </div>
            <div>
                <label htmlFor="unitsInStock">Stock: </label>
                <input type="text" name="unitsInStock" id="unitsInStock" onChange={formik.handleChange} value={formik.values.unitsInStock} />
                {formik.touched.unitsInStock && formik.errors.unitsInStock ? <p style={{ color: 'red' }}>{formik.errors.unitsInStock}</p> : <></>}
            </div>
            <div>
                <label htmlFor="quantityPerUnit">Quantity Per Unit: </label>
                <input type="text" name="quantityPerUnit" id="quantityPerUnit" onChange={formik.handleChange} value={formik.values.quantityPerUnit} />
                {formik.touched.quantityPerUnit && formik.errors.quantityPerUnit ? <p style={{ color: 'red' }}>{formik.errors.quantityPerUnit}</p> : <></>}
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
}

export default AddProduct;
