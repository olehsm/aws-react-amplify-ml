// Rekognition.js
import React, { useState } from 'react';
import Amplify, { Predictions} from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
//Amplify.addPluggable(new AmazonAIPredictionsProvider());

function Rekognition() {
    const [response, setResponse] = useState("Upload a photo!");
    const identify = async (e) => {
        const { target: { files } } = e;
        const [file,] = files || [];
        if (!file) {
            return;
        }

        const result = await Predictions.identify({
            text: { source: { file} }
        })
        setResponse(JSON.stringify(result.text.fullText, null, 2));
    }

    return (
        <div align = "center" style={{backgroundColor: "lightblue"}}>
          <div>
            <p>Text identification</p>
            <input type="file" onChange={identify}></input>
            <p>{response}</p>
          </div>
        </div>
      );
}

export default Rekognition;