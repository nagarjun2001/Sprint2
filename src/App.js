import { Toaster } from "react-hot-toast";
import MainRouter from "./routes/MainRouter";
import '../src/styles/index.css';
import UpdatePassword from "./components/Login/UpdatePassword";
import JobListingPage from "./components/Admin/CommonCards/JobListingPage";

function App() {
  return (
    <div>
      <MainRouter />
      <Toaster /> 
    </div>
  );
}

export default App;
