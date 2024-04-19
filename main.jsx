import { createRoot } from "react-dom/client"
import App from "./src/App"

const root = createRoot(document.querySelector('#app'))

root.render(
    <App/>
)