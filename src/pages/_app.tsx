import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "./../components/Toast/style.css";
import "./../pages/Register/style.css";

import { Provider, createClient } from "urql";

const client = createClient({
  url: "http://localhost:2001/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

import theme from "../theme";

function App({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        {/* <ColorModeProvider> */}
        <CSSReset />
        <Component {...pageProps} />
        {/* </ColorModeProvider> */}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
