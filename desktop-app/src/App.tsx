import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import ControlLayout from "./layouts/ControlLayout";
import AuthButton from "@/components/global/AuthButton";

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ControlLayout>
        <AuthButton />
      </ControlLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
