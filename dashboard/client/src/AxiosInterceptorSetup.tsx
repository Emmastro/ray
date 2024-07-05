import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "./service/requestHandlers"; // Adjust the import path as necessary

const AxiosInterceptorSetup: React.FC = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AxiosInterceptorSetup;
