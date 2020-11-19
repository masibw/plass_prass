import './App.css';
import React, { useState } from 'react';
import SpeechRecognitionService from './speechRecognitionService';

function App() {
    const [recording, setRecording] = useState(false);
    const [text,setText] = useState("")
    // eslint-disable-next-line no-undef
    const recognition = new SpeechRecognitionService();
    recognition.recognition.onsoundstart=function() {
        console.log('音が検出できました。');
    }
    const startRecording = () =>{
        recognition.onResult((result, isFinal) => {
            if (isFinal) {
                console.log(result)
                // this.processor.process(result);
            }
            setText(result);
        });

        setRecording(true)
        recognition.start();
    }

    const stopRecording = () =>{
        setRecording(false)
        recognition.stop()
    }


    const toggleRecording = () => {
        recording ? stopRecording() : startRecording()
    }


  return (
    <div className="App">
      <header className="App-header">
        <img src={`${process.env.PUBLIC_URL}/plass.jpg`} className="plass-logo" alt="logo" />
        <p>
          Can you call `plass` correctly?
        </p>
          {text && <h2>認識結果: {text}</h2>}
      </header>
        <button onClick={toggleRecording}>{recording ? 'Stop' : 'Start'} calling him.</button>
        <p id="Result_text"></p>
        <p id="status"></p>
    </div>
  );
}

export default App;
