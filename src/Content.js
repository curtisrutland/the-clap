import React from 'react';
import options from "./options.json";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Content() {
    const [token, setToken] = React.useState(options[0].value);
    const [input, setInput] = React.useState("");
    const [buttonTxt, setButtonTxt] = React.useState("Copy to Clipboard");

    const outputRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const loadedRef = React.useRef(false);

    React.useEffect(() => {
        if(loadedRef.current === false) {
            loadedRef.current = true;
            inputRef.current.focus();
        }
    });

    const handleSetToken = (val) => () => {
        setToken(val);
    }

    const opts = options.map((o, i) => <Dropdown.Item onClick={handleSetToken(o.value)} key={i}>{o.display}</Dropdown.Item>)

    function handleInputChange(evt) {
        setInput(evt.target.value);
    }

    function generateOutput() {
        const inputTokens = input.trim().split(' ').filter(t => t.trim() !== "");
        let results = [];
        for (let it of inputTokens) {
            results.push(it);
            results.push(token);
        };
        const out = results.join(' ');
        return out;
    }

    function copy(evt) {
        outputRef.current.select();
        document.execCommand("copy");
        evt.target.focus();
        setButtonTxt("Copied!");
        setTimeout(() => setButtonTxt("Copy to Clipboard"), 3000);
    }

    const output = generateOutput();

    return (
        <Form>
            <Form.Group>
                <Form.Label>Input</Form.Label>
                <Form.Control type="text" placeholder="Enter phrase..." value={input} onChange={handleInputChange} ref={inputRef} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Separator</Form.Label>
                <InputGroup>
                    <FormControl placeholder="Text to insert..." aria-label="Text to insert..." value={token} onChange={e => setToken(e.target.value)} />
                    <DropdownButton as={InputGroup.Append} variant="outline-secondary" title="Presets" id="input-group-dropdown-2">
                        {opts}
                    </DropdownButton>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>Results</Form.Label>
                <InputGroup>
                    <FormControl readOnly placeholder="Output goes here..." value={output} ref={outputRef} />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={copy}>{buttonTxt}</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Form>
    )
}