import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/context";
import ProtectedRoute from "./ProtectedRoute";
import { Box } from "@material-ui/core";

const LazyNotFoundView = lazy(() => import("./components/NotFoundView"));
const LazyClassesPane = lazy(() =>
  import("./components/Resource Page/ClassesPane")
);
const LazyCart = lazy(() => import("./components/Cart/Cart"));
const LazyCoursePage = lazy(() =>
  import("./components/Product Page/CoursePage")
);
const LazySupportPage = lazy(() =>
  import("./components/Support Page/SupportPage")
);
const LazyRegistration = lazy(() =>
  import("./components/LoginRegister/Registration")
);
const LazyLogin = lazy(() => import("./components/LoginRegister/Login"));
const LazyMyOrders = lazy(() => import("./components/MyOrders/MyOrders"));
const LazyProductDetails = lazy(() =>
  import("./components/ProductDetails/ProductDetails")
);
const LazyTestProductDetails = lazy(() =>
  import("./components/TestDetails/TestProductDetails")
);
const LazyBookProductDetails = lazy(() =>
  import("./components/BookDetails/BookProductDetails")
);
const LazyAddProduct = lazy(() =>
  import("./components/DashboardLayout/ProductListView/AddProduct")
);
const LazyDashboardLayout = lazy(() => import("./components/DashboardLayout"));
const LazyPdfViewer = lazy(() => import("./components/Books/PdfViewer"));
const LazyResources = lazy(() => import("./components/Books/Resources"));
const LazyComingSoon = lazy(() => import("./components/ComingSoon"));
const LazyLanding = lazy(() => import("./components/LandingPage/Landing"));

function App() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      className="App"
      style={{
        position: "relative",
        minHeight: "100vh"
      }}
    >
      <AuthProvider>
        <Router>
          <Navbar />
          <Box flexGrow={1}>
            <Suspense fallback={<h3>Loading...</h3>}>
              <Switch>
                <Route path="/classes" component={LazyClassesPane} />
                <Route path="/cart" component={LazyCart} />
                <Route exact path="/product" component={LazyCoursePage} />
                <Route path="/support" component={LazySupportPage} />
                <Route path="/register" component={LazyRegistration} />
                <Route path="/login" component={LazyLogin} />
                <Route path="/orders" component={LazyMyOrders} />
                <Route
                  path="/course/details/:name"
                  component={LazyProductDetails}
                />
                <Route
                  path="/test/details/:_id"
                  component={LazyTestProductDetails}
                />
                <Route
                  path="/book/details/:_id"
                  component={LazyBookProductDetails}
                />

                {/* Protected routes go here */}
                <Route path="/product/add" component={LazyAddProduct} />
                <Route
                  path="/product/edit/:productId"
                  component={LazyAddProduct}
                />
                <Route path="/admin" component={LazyDashboardLayout} />
                <Route path="/resources/:fileName" component={LazyPdfViewer} />
                <ProtectedRoute path="/resources" component={LazyResources} />
                <Route path="/coming" component={LazyComingSoon} />
                <Route path="/" exact component={LazyLanding} />
                <Route component={LazyNotFoundView} />
              </Switch>
            </Suspense>
          </Box>
          <Box>
            <Footer />
          </Box>
        </Router>
      </AuthProvider>
    </Box>
  );
}

export default App;
