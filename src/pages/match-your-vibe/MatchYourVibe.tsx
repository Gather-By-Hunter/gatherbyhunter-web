import { Header, Main } from "@components/index.ts";

export const MatchYourVibe: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <form>
          <label htmlFor="pinterest-url">Pinterest Board Url:</label>
          <input
            type="text"
            id="pinterest-url"
            placeholder="https://pin.it/34XTynJsC"
            className="border ml-4 mr-4"
          />
          <input
            type="submit"
            value="Submit"
            className="border cursor-pointer"
          />
        </form>
      </Main>
    </>
  );
};

export default MatchYourVibe;
