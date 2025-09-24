import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause, RotateCcw, Timer } from "lucide-react";
import { useState, useEffect } from "react";

const Countdown = () => {
  const [countdown, setCountdown] = useState(60);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [shortTimer, setShortTimer] = useState(10);
  const [isShortRunning, setIsShortRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(5);
  const [customSeconds, setCustomSeconds] = useState(customMinutes * 60);
  const [isCustomRunning, setIsCustomRunning] = useState(false);

  // Main countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountingDown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setIsCountingDown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCountingDown, countdown]);

  // Short timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isShortRunning && shortTimer > 0) {
      interval = setInterval(() => {
        setShortTimer(prev => {
          if (prev <= 1) {
            setIsShortRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isShortRunning, shortTimer]);

  // Custom timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCustomRunning && customSeconds > 0) {
      interval = setInterval(() => {
        setCustomSeconds(prev => {
          if (prev <= 1) {
            setIsCustomRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCustomRunning, customSeconds]);

  const startCountdown = () => setIsCountingDown(true);
  const pauseCountdown = () => setIsCountingDown(false);
  const resetCountdown = () => {
    setCountdown(60);
    setIsCountingDown(false);
  };

  const startShortTimer = () => setIsShortRunning(true);
  const resetShortTimer = () => {
    setShortTimer(10);
    setIsShortRunning(false);
  };

  const startCustomTimer = () => {
    setCustomSeconds(customMinutes * 60);
    setIsCustomRunning(true);
  };
  const resetCustomTimer = () => {
    setCustomSeconds(customMinutes * 60);
    setIsCustomRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="countdown-title">
            ⏰ Countdown Timer Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice handling auto-updating countdown timers and time-based testing scenarios.
            Perfect for testing dynamic content updates and time-sensitive operations.
          </p>
        </div>

        {/* Countdown Timers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Main Countdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                60 Second Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div 
                  id="main-countdown"
                  className={`text-4xl font-bold ${
                    countdown <= 10 ? 'text-destructive' : 'text-primary'
                  }`}
                >
                  {countdown}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  seconds remaining
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={startCountdown}
                  disabled={isCountingDown || countdown === 0}
                  id="start-main-countdown"
                  size="sm"
                >
                  <Play className="mr-1 h-3 w-3" />
                  Start
                </Button>
                <Button 
                  onClick={pauseCountdown}
                  disabled={!isCountingDown}
                  id="pause-main-countdown"
                  variant="secondary"
                  size="sm"
                >
                  <Pause className="mr-1 h-3 w-3" />
                  Pause
                </Button>
                <Button 
                  onClick={resetCountdown}
                  id="reset-main-countdown"
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="mr-1 h-3 w-3" />
                  Reset
                </Button>
              </div>

              {countdown === 0 && (
                <div 
                  id="main-countdown-finished"
                  className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm text-center"
                >
                  ⏰ Time's Up!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Short Timer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Quick 10s Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div 
                  id="short-countdown"
                  className={`text-4xl font-bold ${
                    shortTimer <= 3 ? 'text-destructive animate-pulse' : 'text-secondary'
                  }`}
                >
                  {shortTimer}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  quick countdown
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={startShortTimer}
                  disabled={isShortRunning || shortTimer === 0}
                  id="start-short-timer"
                  size="sm"
                  variant="secondary"
                >
                  Start 10s
                </Button>
                <Button 
                  onClick={resetShortTimer}
                  id="reset-short-timer"
                  variant="outline"
                  size="sm"
                >
                  Reset
                </Button>
              </div>

              {shortTimer === 0 && (
                <div 
                  id="short-timer-finished"
                  className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center"
                >
                  ✅ Quick timer done!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Custom Timer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Custom Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="custom-minutes" className="text-sm font-medium">
                  Minutes:
                </label>
                <input
                  id="custom-minutes"
                  type="number"
                  min="1"
                  max="10"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Number(e.target.value) || 1)}
                  disabled={isCustomRunning}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="text-center">
                <div 
                  id="custom-countdown"
                  className="text-3xl font-bold text-accent"
                >
                  {formatTime(customSeconds)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  mm:ss format
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={startCustomTimer}
                  disabled={isCustomRunning || customSeconds === 0}
                  id="start-custom-timer"
                  size="sm"
                  variant="outline"
                >
                  Start
                </Button>
                <Button 
                  onClick={resetCustomTimer}
                  id="reset-custom-timer"
                  variant="outline"
                  size="sm"
                >
                  Reset
                </Button>
              </div>

              {customSeconds === 0 && !isCustomRunning && (
                <div 
                  id="custom-timer-finished"
                  className="p-3 bg-accent/10 border border-accent/20 rounded-lg text-accent text-sm text-center"
                >
                  🎯 Custom timer complete!
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Testing Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium Testing Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Time-Based Testing:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <code>WebDriverWait</code> with custom timeouts</li>
                  <li>• <code>ExpectedConditions.textToBe()</code> for countdown values</li>
                  <li>• <code>Thread.sleep()</code> for specific wait periods</li>
                  <li>• Polling strategies for dynamic updates</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Test Scenarios:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Verify countdown decrements correctly</li>
                  <li>• Test completion state detection</li>
                  <li>• Validate pause/resume functionality</li>
                  <li>• Check visual state changes (colors, animations)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Countdown;