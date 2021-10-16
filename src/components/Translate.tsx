import React, { FormEvent} from 'react';
import axios from 'axios';
import TranslatedText from "./TranslatedText";
import Form from "./Form";
import styled from 'styled-components';

type TTranslate = () => JSX.Element;

type TTargetLang =  'az' | 'de' | 'en' | 'et' | 'ka' | 'lt' | 'lv' | 'ru' | 'uk';

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Translate: TTranslate = () => {
    const options: object = {
        method: 'GET',
        url: 'https://just-translated.p.rapidapi.com/',
        params: {lang: ['ru'], text: 'Hello, how are you?'},
        headers: {
            'x-rapidapi-host': 'just-translated.p.rapidapi.com',
            'x-rapidapi-key': 'b8c2b180d6msh457b7ce20234330p1ce362jsnda93d21ac368'
        }
    };
    const submitForm = (e:FormEvent, text: string, context: string): void => {
        e.preventDefault();
        setTranslatedText(text);
        setContext(context)
    }
    const translateText = async (translatedText: string, targetLang: TTargetLang): Promise<string> => {
        const params = { text: translatedText, lang: targetLang };
        const response = await axios.request({ ...options, params } )
            .then((res) => {
                const resString = JSON.stringify(res);
                const obj = JSON.parse(resString);

                return obj.data.text[0];
            })
            .catch((error) => console.error(error));

        return response;
    };
    const [translatedText, setTranslatedText] = React.useState<string>('');
    const [context, setContext] = React.useState<string>('');
    const [engTranslate, setEngTranslate] = React.useState<string>('');
    console.log('Translate');

    return (
        <div>
            <Form
                submitForm={submitForm}
            />
            {translatedText &&
                <Row>
                    <TranslatedText
                        translateText={translateText}
                        context={context}
                        lang={'az'}
                        sourceText={engTranslate || translatedText}
                    />
                    <TranslatedText
                        translateText={translateText}
                        context={context}
                        lang={'de'}
                        sourceText={engTranslate || translatedText}
                    />
                    <TranslatedText
                        translateText={translateText}
                        context={context}
                        lang={'en'}
                        sourceText={engTranslate || translatedText}
                        getEngTranslate={setEngTranslate}
                    />
                    <TranslatedText
                        translateText={translateText}
                        context={context}
                        lang={'et'}
                        sourceText={engTranslate || translatedText}
                    />
                    <TranslatedText
                        translateText={translateText}
                        context={context}
                        lang={'ka'}
                        sourceText={engTranslate || translatedText}
                    />
                    <TranslatedText
                        translateText={translateText}
                        context={context}
                        lang={'lt'}
                        sourceText={engTranslate || translatedText}
                    />
                    <TranslatedText
                        translateText={translateText}
                        context={context}
                        lang={'lv'}
                        sourceText={engTranslate || translatedText}
                    />
                    <TranslatedText
                        translateText={translateText}
                        context={context}
                        lang={'ru'}
                        sourceText={engTranslate || translatedText}
                    />
                    <TranslatedText
                        translateText={translateText}
                        context={context}
                        lang={'uk'}
                        sourceText={engTranslate || translatedText}
                    />
                </Row>
            }
        </div>
    );
};

export default Translate;