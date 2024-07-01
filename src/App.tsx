import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  CssBaseline,
} from "@mui/material";

// TODO: Move types to a separate file
type LogEntry = {
  id: number;
  message: string;
};

type State = {
  count: number;
};

type Action = { type: "increment" } | { type: "decrement" };

// TODO: Move reducer to a separate file
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// TODO: Move this component to a separate file
const App: React.FC = () => {
  // useState hook
  const [inputValue, setInputValue] = useState<string>("");

  // useReducer hook
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // useRef hook
  const renderCount = useRef<number>(0);

  // useState for logging
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Helper function to add log entries
  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, { id: Date.now(), message }]);
  };

  // useEffect hook
  useEffect(() => {
    addLog("useEffect: Component mounted or updated");
    return () => {
      addLog("useEffect cleanup: Component will unmount");
    };
  }, [inputValue, state.count]);

  // useLayoutEffect hook
  useLayoutEffect(() => {
    addLog("useLayoutEffect: Layout effect executed");
    return () => {
      addLog("useLayoutEffect cleanup: Before next layout effect or unmount");
    };
  }, [inputValue]);

  // useCallback hook
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      addLog("useCallback: Input value changed");
    },
    []
  );

  // useMemo hook
  const expensiveComputation = useMemo(() => {
    addLog("useMemo: Expensive computation executed");
    return inputValue.split("").reverse().join("");
  }, [inputValue]);

  // Increment renderCount on each render
  renderCount.current += 1;

  // TODO: Move theme to a separate file
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          React Hooks Lifecycle Showcase
        </Typography>

        <TextField
          fullWidth
          label="Enter some text"
          value={inputValue}
          onChange={handleInputChange}
          margin="normal"
        />

        <Typography variant="body1" gutterBottom>
          Reversed text (useMemo): {expensiveComputation}
        </Typography>

        <Typography variant="body1" gutterBottom>
          Render count (useRef): {renderCount.current}
        </Typography>

        <Typography variant="body1" gutterBottom>
          Count (useReducer): {state.count}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, marginY: 2 }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: "increment" })}
          >
            Increment
          </Button>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: "decrement" })}
          >
            Decrement
          </Button>
        </Box>

        <Typography variant="h6" gutterBottom>
          Lifecycle Logs:
        </Typography>

        <List>
          {logs.map((log) => (
            <ListItem key={log.id}>{log.message}</ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );
};

export default App;
