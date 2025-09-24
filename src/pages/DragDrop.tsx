import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Move, RotateCcw, Target, ArrowRight } from "lucide-react";
import { useState, useRef, DragEvent } from "react";

const DragDrop = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dropZoneItems, setDropZoneItems] = useState<string[]>([]);
  const [sourceItems, setSourceItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [dragCount, setDragCount] = useState(0);
  const [lastAction, setLastAction] = useState('');

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item);
    setLastAction(`Started dragging: ${item}`);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetZone: string) => {
    e.preventDefault();
    const droppedItem = e.dataTransfer.getData('text/plain');
    
    if (targetZone === 'dropzone') {
      if (!dropZoneItems.includes(droppedItem)) {
        setDropZoneItems(prev => [...prev, droppedItem]);
        setSourceItems(prev => prev.filter(item => item !== droppedItem));
        setDragCount(prev => prev + 1);
        setLastAction(`Dropped "${droppedItem}" into drop zone`);
      }
    } else if (targetZone === 'source') {
      if (!sourceItems.includes(droppedItem)) {
        setSourceItems(prev => [...prev, droppedItem]);
        setDropZoneItems(prev => prev.filter(item => item !== droppedItem));
        setLastAction(`Returned "${droppedItem}" to source`);
      }
    }
    
    setDraggedItem(null);
  };

  const resetItems = () => {
    setSourceItems(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
    setDropZoneItems([]);
    setDragCount(0);
    setLastAction('Reset all items');
    setDraggedItem(null);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="drag-drop-title">
            🎯 Drag & Drop Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice drag and drop interactions with various scenarios and drop zones.
            Essential for testing modern interactive web applications.
          </p>
        </div>

        {/* Status Display */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary" id="drag-count">
                  {dragCount}
                </div>
                <div className="text-sm text-muted-foreground">Total Drops</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary" id="source-count">
                  {sourceItems.length}
                </div>
                <div className="text-sm text-muted-foreground">Source Items</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent" id="dropped-count">
                  {dropZoneItems.length}
                </div>
                <div className="text-sm text-muted-foreground">Dropped Items</div>
              </div>
            </div>
            
            {lastAction && (
              <div className="mt-4 p-2 bg-muted rounded text-center text-sm" id="last-action">
                Last Action: <strong>{lastAction}</strong>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Drag and Drop Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Source Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Move className="h-5 w-5" />
                Drag Source
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="min-h-[300px] p-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'source')}
                id="drag-source-zone"
              >
                <div className="grid grid-cols-2 gap-3">
                  {sourceItems.map((item, index) => (
                    <div
                      key={item}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className="p-3 bg-primary text-primary-foreground rounded-lg shadow-md cursor-move hover:shadow-lg transition-all duration-200 text-center select-none"
                      id={`source-item-${index + 1}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Move className="h-4 w-4" />
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
                
                {sourceItems.length === 0 && (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No items to drag</p>
                      <p className="text-sm">Drop items here to return them</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Drop Zone */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Drop Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className={`min-h-[300px] p-4 border-2 border-dashed rounded-lg transition-all duration-200 ${
                  draggedItem 
                    ? 'border-accent bg-accent/10 border-accent/50' 
                    : 'border-accent/30 bg-accent/5'
                }`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'dropzone')}
                id="drop-target-zone"
              >
                {dropZoneItems.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {dropZoneItems.map((item, index) => (
                      <div
                        key={item}
                        className="p-3 bg-accent text-accent-foreground rounded-lg shadow-md text-center"
                        id={`dropped-item-${index + 1}`}
                      >
                        ✅ {item}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <ArrowRight className={`h-8 w-8 mx-auto mb-2 ${draggedItem ? 'animate-bounce' : 'opacity-50'}`} />
                      <p>Drop items here</p>
                      <p className="text-sm">Drag items from the left panel</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-center">
              <Button 
                onClick={resetItems}
                id="reset-drag-drop"
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset All Items
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Testing Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium Drag & Drop Testing Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Actions API:</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    Actions actions = new Actions(driver);<br />
                    actions.dragAndDrop(source, target).perform();
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Alternative approach<br />
                    actions.clickAndHold(source)<br />
                    &nbsp;&nbsp;.moveToElement(target)<br />
                    &nbsp;&nbsp;.release().perform();
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">HTML5 Drag & Drop:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Use <code>dragAndDropBy()</code> for coordinate-based drops</li>
                  <li>• Test with <code>moveByOffset()</code> for custom paths</li>
                  <li>• Verify draggable="true" attribute</li>
                  <li>• Check drop zone acceptance logic</li>
                  <li>• Test drag start/end events</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">✅ Test Scenarios:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Drag items from source to drop zone</li>
                <li>• Verify item count changes in both zones</li>
                <li>• Test drag and drop between different containers</li>
                <li>• Validate visual feedback during drag operations</li>
                <li>• Test drag cancellation (drag without dropping)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DragDrop;