// App.js
import React, { useState } from 'react';
import Amplify, { Predictions} from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Amplify.addPluggable( new AmazonAIPredictionsProvider() );

function App() {
	const [response, setResponse] =  useState("Translation Output")
	const [sourceText, setSourceText] = useState("input som text");

	const translate = async () => {
		const data = await Predictions.convert( {
			translateText: {
				source: {text: sourceText}}
		})
		setResponse(data.text);
	}

	const setText = (e) => {
		setSourceText(e.target.value);
	}

	return (
      <div align = "center" style={{backgroundColor: "lightblue"}}>
        <div>
          <p>Text Translation English -> Norwegian
			 </p>
          <input value={sourceText} onChange={setText}></input>
          <button onClick={translate}>Click Here to Translate</button>
          <p>{response}</p>
        </div>
      </div>
    );
}


export default App;