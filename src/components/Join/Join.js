import React, { useState } from 'react';
import axios from '../../axios';
import './Join.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Join = () => {
    const [value, setValue] = useState('');
    const handleChange = ({ target }) => {
        setValue({
            [target.name]: target.value
        });
    }

    const join = () => {
        axios.post('/join', value).then(() => {
            location.replace('/');
        });
    }

    return (
        <section className="form_container">
            <h1>Chat room</h1>
            <span className="bold_line"></span>
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange={(value) => handleChange(value)} type="email" name="email" id="exampleEmail" placeholder="type your email" />
                </FormGroup>
                <Button onClick={() => join()} type="submit">Join</Button>
            </Form>
        </section>
    );
}

export default Join;