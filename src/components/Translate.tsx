import React, {ChangeEvent, FormEvent} from 'react';
import axios from 'axios';

type TTranslate = () => JSX.Element;

const Translate: TTranslate = () => {
    const options: object = {
        method: 'POST',
        url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
            'x-rapidapi-key': 'b8c2b180d6msh457b7ce20234330p1ce362jsnda93d21ac368'
        },
    };
    const translateText = (e: FormEvent,translateText: string): void => {
        e.preventDefault();
        const data = {q: translateText, source: 'ru', target: 'en'};
        axios.request({ ...options, data: {...data}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    };
    const [text, setText] = React.useState<string>('');
    const handleText = (e: ChangeEvent<HTMLInputElement>): void => setText(e.target.value);

    return (
        <div>
            <form onSubmit={(e) => translateText(e,text)}>
                <input type="text" value={text} onChange={handleText}/>
            </form>
        </div>
    );
};

export default Translate;