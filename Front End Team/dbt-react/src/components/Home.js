const Home = () => {
  return (
    <div>
      <h1>Home page</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
          paddingTop: "20px",
        }}
      >
        <iframe
          src="https://copilotstudio.microsoft.com/environments/Default-3c678821-7750-47a3-937f-2661439abb7a/bots/cr971_copilotTest/webchat?__version__=2"
          frameBorder="0"
          style={{ width: "600px", height: "400px", border: "1px solid #ccc" }}
          title="Copilot Studio"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
