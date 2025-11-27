import { Header, Main } from "../../components/index.ts";

export const NotFound: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <h1>404 | Page Not Found</h1>
        <p>Returning to home...</p>
      </Main>
    </>
  );
};

export default NotFound;
