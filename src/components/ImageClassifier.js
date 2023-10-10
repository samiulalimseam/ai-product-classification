import { Box, Button, Flex, Image, Input, Textarea, useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs-backend-webgl";
import { useEffect } from "react";

const ImageClassifier = () => {
  const [model, setModel] = useState(null);
  const [predictedData, setSetPredictedData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState('');

  const toast = useToast();
  
  // load the model
  const laodModel = async () => {
    setIsLoading(true);
    const loadedModel = await mobilenet.load();
    setModel(loadedModel);
    setIsLoading(false);
    toast({
      title: "Model Loaded.",
      description: " Successfully laoded the Model",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // function to classify an image
  const classifyImage = async () => {
    const imageElement = document.getElementById('imageModel')
    console.log(imageElement);
    if (model) {
        console.log(model)
      const predictions = await model.classify(imageElement);
      if(predictions) {
        
            let objectString = "";
        
            predictions.forEach(obj => {
                objectString += obj.className + ", ";
            });
        
           
            objectString = objectString.slice(0, -2);
        
             setSetPredictedData(objectString)
      
        
      }
      console.log(predictions);
    } else {
      console.error("Model not loaded yet");
    }
  };
 
useEffect(()=> {
    laodModel()
}, [])



  return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} w={"full"} minH={"100vh"}>
        <Textarea w={'400px'} type="text" onChange={(e)=> setImageData(e.target.value)} />
      <Image crossOrigin="anonymous" id="imageModel" w={'500px'} src={imageData} />
      <Button  onClick={(e) => {
       
        classifyImage()
      }}  >Analyze</Button>
          <Textarea value={JSON.stringify(predictedData)} />
    </Flex>
  );
};

export default ImageClassifier;
