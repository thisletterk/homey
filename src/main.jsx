import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import * as te from "tw-elements";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initalState";
import reducer from "./context/reducer";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<StateProvider initialState={initialState} reducer={reducer}>
				<AuthContext>
					<App />
				</AuthContext>
			</StateProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
