import React, {ChangeEvent, FormEvent} from 'react';
import styled from 'styled-components';
import {Button} from "./TranslatedText";

interface IProps {
    submitForm: (e: FormEvent<HTMLFormElement>, text: string, context: string) => void,
}

interface IData {
    text: string,
    context: string,
}

type TForm = (props: IProps) => JSX.Element;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    padding: 20px;
    & input {
        height: 30px;
        border: none;
        border-bottom: 1px solid grey;
        margin-bottom: 10px;
    }
    & input:focus{
        outline: none;
    }
    & input[type='submit']{
        background: blue;
        margin: 0 auto;
        color: #fff;
        font-weight: 600;
        border: 1px solid #fff;
        border-radius: 4px;
        cursor: pointer;
    }
`;

const Form: TForm = ({submitForm}) => {
    const data: IData = {
        text: '',
        context: '',
    };
    const [dataForm, setDataForm] = React.useState<IData>(data);
    const handleText = (e: ChangeEvent<HTMLInputElement>) => {
        setDataForm({...dataForm, [e.target.name]: e.target.value});
    };

    return (
        <>
            <StyledForm onSubmit={(e) => submitForm(e, dataForm.text, dataForm.context)}>
                <label htmlFor="text">Текст</label>
                <input id="text" type="text" name="text" value={dataForm.text} onChange={handleText}/>
                <label htmlFor="context">Контекст</label>
                <input id="context" type="text" name="context" value={dataForm.context} onChange={handleText}/>
                <Button fontSize={18}>Первести</Button>
            </StyledForm>
        </>
    );
};

export default Form;