import React, { useEffect, useState } from 'react';

// material-ui
import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import MainCard from '../../../ui-component/cards/MainCard';
import SearchSection from '../../../layout/MainLayout/Header/SearchSection';
import { 
    getCustProductList,
    getCustUnitList
 } from '../../../actions';
import { useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import ProductPage from "./ProductPage";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { fetchProducts } from "./dataApi";



// project imports

//==============================|| SAMPLE PAGE ||==============================//

const CustSalePage = () => {
   
    const theme = useTheme();
    const dispatcher = useDispatch();
    const [seachTxt, setSeachTxt] = useState("");
    const [productData, setProductData] = useState([]);
    const [categories, setCategories] = useState([]);
  
    const fetchData = async () => {
      await fetchProducts()
      .then((data) => {
        setProductData(data);
        setCategories(prev => [...new Set(data.map((item) => item.category))])
      })
      .catch((e) => {
        console.error(e);
      });
    };
  
    const fetchDataByCategorie = (e) =>{
      fetchProducts(e.target.value)
      .then((data) => {
        setProductData(data);
      })
      .catch((e) => {
        console.error(e);
      });
    }
    const onSeachTxt= (value) =>{
        setSeachTxt(value)
        dispatcher( getCustProductList() );
    }

    useEffect(()=>{
        dispatcher( getCustProductList() );
        fetchData();
    },[])

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  

function getSteps() {
  return ['Products', 'Cart', 'Finshed'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ProductPage products={productData} />;
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

    return (
      <Card>
      <CardContent>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
          <div>
            <Typography >
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} >
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography >{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    
    </Card>
    );
};

export default CustSalePage;
