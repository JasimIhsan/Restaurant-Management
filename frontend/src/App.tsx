import './App.css';
import { Toaster } from '@/components/ui/sonner.tsx';
import { Home } from '@/pages/Home.tsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
   return (
      <>
         <Toaster />
         <BrowserRouter>
            <Home />
         </BrowserRouter>
      </>
   );
}

export default App;
