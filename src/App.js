import { Suspense, lazy } from "react";
import AppRouter from "./components/router/routes";
import Loading from "./components/utills/Loading";
import { useFeedbackModalContext } from "./contexts/FeedbackContext";

const TermsModal = lazy(() => import("./components/terms/TermsModal"));
const FeedbackModal = lazy(() => import('./components/feedback/FeedbackModal'));

function App() {
  const { isFeedbackModalOpen, setFeedbackModalOpen } = useFeedbackModalContext();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <AppRouter />
      </Suspense>

      {isFeedbackModalOpen && (
        <Suspense fallback={<Loading />}>
          <FeedbackModal />
        </Suspense>
      )
      }
    </>
  );
}

export default App;
