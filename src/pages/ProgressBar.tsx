import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, Play, Square, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, progress]);

  const startProgress = () => {
    setIsRunning(true);
  };

  const stopProgress = () => {
    setIsRunning(false);
  };

  const resetProgress = () => {
    setProgress(0);
    setIsRunning(false);
  };

  const toggleSpinner = () => {
    setIsSpinning(!isSpinning);
  };

  const incrementStep = () => {
    setStepProgress(prev => Math.min(prev + 20, 100));
  };

  const resetStep = () => {
    setStepProgress(0);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="progress-bar-title">
            📊 Progress Bar & Loading Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice handling progress indicators, loading spinners, and dynamic progress tracking.
            Essential for testing async operations and waiting strategies.
          </p>
        </div>

        {/* Progress Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Automatic Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Automatic Progress Bar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground" id="progress-percentage">
                    {progress}%
                  </span>
                </div>
                <Progress 
                  value={progress} 
                  className="w-full" 
                  id="auto-progress-bar"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={startProgress}
                  disabled={isRunning || progress === 100}
                  id="start-progress-btn"
                  size="sm"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </Button>
                <Button 
                  onClick={stopProgress}
                  disabled={!isRunning}
                  id="stop-progress-btn"
                  variant="secondary"
                  size="sm"
                >
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </Button>
                <Button 
                  onClick={resetProgress}
                  id="reset-progress-btn"
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>

              {progress === 100 && (
                <div 
                  id="progress-complete"
                  className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
                >
                  ✅ Progress Complete!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Loading Spinner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Loader2 className="h-5 w-5" />
                Loading Spinner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
                {isSpinning ? (
                  <div className="text-center">
                    <Loader2 
                      className="h-8 w-8 animate-spin text-primary mx-auto mb-2" 
                      id="loading-spinner"
                    />
                    <p className="text-sm text-muted-foreground" id="loading-text">
                      Loading...
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground" id="spinner-idle">
                    Click button to show spinner
                  </p>
                )}
              </div>
              
              <Button 
                onClick={toggleSpinner}
                id="toggle-spinner-btn"
                variant={isSpinning ? "destructive" : "default"}
                className="w-full"
              >
                {isSpinning ? "Stop Loading" : "Start Loading"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Step Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Step-by-Step Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Step Progress</span>
                <span className="text-sm text-muted-foreground" id="step-percentage">
                  {stepProgress}%
                </span>
              </div>
              <Progress 
                value={stepProgress} 
                className="w-full" 
                id="step-progress-bar"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={incrementStep}
                disabled={stepProgress >= 100}
                id="increment-step-btn"
              >
                Add 20% (+)
              </Button>
              <Button 
                onClick={resetStep}
                id="reset-step-btn"
                variant="outline"
              >
                Reset Steps
              </Button>
            </div>

            <div className="grid grid-cols-5 gap-2 mt-4">
              {[20, 40, 60, 80, 100].map((step, index) => (
                <div
                  key={step}
                  id={`step-${index + 1}`}
                  className={`p-2 text-center text-xs rounded ${
                    stepProgress >= step 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Step {index + 1}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Testing Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium Testing Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Wait Strategies:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <code>WebDriverWait</code> for progress completion</li>
                  <li>• <code>ExpectedConditions.attributeContains()</code></li>
                  <li>• <code>ExpectedConditions.textToBe()</code></li>
                  <li>• Custom wait for percentage values</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Test Scenarios:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Monitor progress value changes</li>
                  <li>• Wait for spinner appearance/disappearance</li>
                  <li>• Validate completion states</li>
                  <li>• Test progress bar accessibility attributes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProgressBar;