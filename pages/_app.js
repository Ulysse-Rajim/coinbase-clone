import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const supportedChainIds = [4];
const connectors = {
  injected: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
