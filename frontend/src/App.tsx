import './App.css';
import { Toaster } from '@/components/ui/sonner.tsx';
import { Home } from '@/pages/Home.tsx';

function App() {
   return (
      <>
         <Toaster />
         <Home />
      </>
   );
}

export default App;
