import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /home when the component is mounted
    router.push("/home");
  }, [router]); // Empty dependency array ensures this runs only once after the first render

  return null; // Optionally return null as there's no need to render anything
};

export default Index;
