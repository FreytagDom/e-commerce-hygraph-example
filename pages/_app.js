import Layout from "../components/Layout";
import "../styles/globals.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AToOdAXgXQV-L6ueUybXD_IB348s-272JMC_Y9pAttaGUNw73cJnrsr4DRipBJyv1qhcasbiXYP2nm9d",
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
