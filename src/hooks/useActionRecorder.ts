import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface RecordedAction {
  id: string;
  stepNo: number;
  actionType: string;
  targetElement: string;
  value: string;
  timestamp: string;
  page: string;
}

class ActionRecorderService {
  private static instance: ActionRecorderService;
  private actions: RecordedAction[] = [];
  private isRecording = false;
  private stepCounter = 1;
  private listeners: Set<() => void> = new Set();

  static getInstance() {
    if (!ActionRecorderService.instance) {
      ActionRecorderService.instance = new ActionRecorderService();
    }
    return ActionRecorderService.instance;
  }

  startRecording() {
    this.isRecording = true;
    this.stepCounter = this.actions.length + 1;
    this.setupGlobalListeners();
    this.notifyListeners();
  }

  stopRecording() {
    this.isRecording = false;
    this.removeGlobalListeners();
    this.notifyListeners();
  }

  addAction(action: Omit<RecordedAction, 'id' | 'stepNo' | 'timestamp'>) {
    if (!this.isRecording) return;

    const newAction: RecordedAction = {
      ...action,
      id: Date.now().toString(),
      stepNo: this.stepCounter++,
      timestamp: new Date().toLocaleTimeString()
    };

    this.actions.push(newAction);
    this.notifyListeners();
  }

  getActions() {
    return [...this.actions];
  }

  clearActions() {
    this.actions = [];
    this.stepCounter = 1;
    this.notifyListeners();
  }

  isCurrentlyRecording() {
    return this.isRecording;
  }

  addListener(listener: () => void) {
    this.listeners.add(listener);
  }

  removeListener(listener: () => void) {
    this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  private setupGlobalListeners() {
    document.addEventListener('click', this.handleClick, true);
    document.addEventListener('input', this.handleInput, true);
    document.addEventListener('change', this.handleChange, true);
    document.addEventListener('contextmenu', this.handleRightClick, true);
    document.addEventListener('dblclick', this.handleDoubleClick, true);
    document.addEventListener('dragstart', this.handleDragStart, true);
    document.addEventListener('drop', this.handleDrop, true);
  }

  private removeGlobalListeners() {
    document.removeEventListener('click', this.handleClick, true);
    document.removeEventListener('input', this.handleInput, true);
    document.removeEventListener('change', this.handleChange, true);
    document.removeEventListener('contextmenu', this.handleRightClick, true);
    document.removeEventListener('dblclick', this.handleDoubleClick, true);
    document.removeEventListener('dragstart', this.handleDragStart, true);
    document.removeEventListener('drop', this.handleDrop, true);
  }

  private getElementIdentifier(element: Element): string {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ')[0]}`;
    return element.tagName.toLowerCase();
  }

  private handleClick = (event: Event) => {
    const target = event.target as Element;
    if (target.closest('.action-recorder-controls')) return; // Ignore recorder controls
    
    this.addAction({
      actionType: 'Click',
      targetElement: this.getElementIdentifier(target),
      value: '',
      page: window.location.pathname
    });
  };

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.addAction({
      actionType: 'Type',
      targetElement: this.getElementIdentifier(target),
      value: target.value,
      page: window.location.pathname
    });
  };

  private handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    if (target.tagName === 'SELECT') {
      this.addAction({
        actionType: 'Select',
        targetElement: this.getElementIdentifier(target),
        value: target.value,
        page: window.location.pathname
      });
    }
  };

  private handleRightClick = (event: Event) => {
    const target = event.target as Element;
    this.addAction({
      actionType: 'Right Click',
      targetElement: this.getElementIdentifier(target),
      value: '',
      page: window.location.pathname
    });
  };

  private handleDoubleClick = (event: Event) => {
    const target = event.target as Element;
    this.addAction({
      actionType: 'Double Click',
      targetElement: this.getElementIdentifier(target),
      value: '',
      page: window.location.pathname
    });
  };

  private handleDragStart = (event: Event) => {
    const target = event.target as Element;
    this.addAction({
      actionType: 'Drag Start',
      targetElement: this.getElementIdentifier(target),
      value: '',
      page: window.location.pathname
    });
  };

  private handleDrop = (event: Event) => {
    const target = event.target as Element;
    this.addAction({
      actionType: 'Drop',
      targetElement: this.getElementIdentifier(target),
      value: '',
      page: window.location.pathname
    });
  };
}

export const useActionRecorder = () => {
  const recorder = ActionRecorderService.getInstance();
  const [, forceUpdate] = useState({});

  const refresh = useCallback(() => {
    forceUpdate({});
  }, []);

  // Subscribe to recorder changes
  useState(() => {
    recorder.addListener(refresh);
    return () => recorder.removeListener(refresh);
  });

  const startRecording = useCallback(() => {
    recorder.startRecording();
    toast.success("Action recording started");
  }, []);

  const stopRecording = useCallback(() => {
    recorder.stopRecording();
    toast.success("Action recording stopped");
  }, []);

  const clearActions = useCallback(() => {
    recorder.clearActions();
    toast.success("Recorded actions cleared");
  }, []);

  return {
    isRecording: recorder.isCurrentlyRecording(),
    actions: recorder.getActions(),
    startRecording,
    stopRecording,
    clearActions,
    addAction: (action: Omit<RecordedAction, 'id' | 'stepNo' | 'timestamp'>) => 
      recorder.addAction(action)
  };
};