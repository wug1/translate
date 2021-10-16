import React from 'react';
import styled from "styled-components";

type TTargetLang = 'az' | 'de' | 'en' | 'et' | 'ka' | 'lt' | 'lv' | 'ru' | 'uk';

interface IProps {
    translateText: (translateText: string, targetLang: TTargetLang) => Promise<string>,
    context: string,
    lang: TTargetLang,
    sourceText: string,
    getEngTranslate?: (string: string) => void,
}

interface IPropsButtons {
    background?: string,
    color?: string,
    fontSize?: number,
}

type TTranslatedText = (props: IProps) => JSX.Element;

const Col = styled.div`
    min-width: 20%;
    padding: 0 10px;
`;
const TranslateBody = styled.div`
    display: flex;
`;
export const Button = styled.button`
    border: none;
    background: ${(props: IPropsButtons) => props.background || '#a6caf0'};
    color: ${(props: IPropsButtons) => props.color || '#fff' };
    font-weight: 600;
    cursor: pointer;
    font-size: ${(props) => props.fontSize+'px' || '1rem'};
    padding: 10px;
    border-radius: 4px;
    &:active{
        opacity: .5;
    }
`;

const TranslatedText: TTranslatedText = (props) => {
    const {translateText, context, lang, sourceText, getEngTranslate} = props;
    const [text, setText] = React.useState<string>('');
    const refTExtArea = React.useRef<HTMLTextAreaElement>(HTMLTextAreaElement as any);
    const copyText = () => navigator.clipboard.writeText(refTExtArea.current.value);
    React.useEffect( () => {
        const fetchText = async () => {
            const translatedText = await translateText(sourceText, lang);
            setText(translatedText);
            if (lang === 'en' && getEngTranslate) getEngTranslate(translatedText);
        }
        fetchText();
    }, [sourceText, lang, translateText, getEngTranslate]);
    console.log('TranslatedText');

    return (
        <Col>
            <h2 style={{marginBottom:0}}>{lang}</h2>
            <textarea
                ref={refTExtArea}
                rows={4}
                cols={40}
                value={`msgctxt "${context}"
msgid "${sourceText}"
msgstr "${text}"`}
            />
            <TranslateBody>
                <Button onClick={copyText}>
                    Copy
                </Button>
            </TranslateBody>
        </Col>
    );
};

export default TranslatedText;