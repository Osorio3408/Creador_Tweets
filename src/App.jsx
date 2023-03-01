import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [tweetsArchived, setTweetsArchived] = useState([]);

  const [limit, setLimit] = useState("text-xs text-gray-500 mt-1");

  useEffect(() => {
    if (tweet.length >= 215) {
      setLimit("text-xs font-bold text-red-800 mt-1");
    } else {
      setLimit("text-xs text-gray-500 mt-1");
    }
  }, [tweet]);

  const handleChange = (e) => {
    setTweet(e.target.value);
  };

  const handlePublish = () => {
    if (tweet.length > 0) {
      setTweets([...tweets, tweet]);
      setTweet("");
    }
  };

  const handleArchive = () => {
    if (tweetsArchived.length === 0) {
      localStorage.setItem("tweets", JSON.stringify(tweets));
    } else {
      setTweetsArchived([...tweetsArchived, tweets]);
      localStorage.setItem("tweets", JSON.stringify(tweetsArchived));
      setTweets([]);
    }
  };

  const handleShowArchive = () => {
    const archivedTweets = JSON.parse(localStorage.getItem("tweets"));
    if (archivedTweets) {
      setTweetsArchived(archivedTweets);
      setTweets([]);
    }
  };

  return (
    <div className="App mt-10 flex justify-center gap-10 items-center flex-col md:flex-row">
      <div className=" border border-slate-300 shadow-slate-600 shadow-md p-10 rounded-md">
        <h1 className="text-2xl font-bold ">Creador de Tweets</h1>
        <hr className="text-black bg-black mb-6 shadow-black shadow-2xl" />
        <textarea
          className="border border-gray-400 p-2 rounded-md w-full"
          placeholder="Escribe tu tweet aquí..."
          maxLength="255"
          value={tweet}
          onChange={handleChange}
        />
        <div className="mb-5">
          <p className={limit}>{255 - tweet.length}</p>
        </div>

        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handlePublish}>
            Publicar
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleArchive}>
            Archivar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={handleShowArchive}>
            Mostrar Archivados
          </button>
        </div>

        <hr className="text-black bg-black my-5 shadow-black shadow-2xl h-1 ," />

        <h2 className="text-xl font-bold mb-4">Tweets recientes:</h2>

        <ul className="mt-4">
          {tweets.map((tweet, i) => (
            <li key={i} className="bg-gray-200 p-2 rounded-md mb-2">
              {tweet}
            </li>
          ))}
        </ul>
      </div>
      <div className=" border border-slate-300 shadow-slate-600 shadow-md p-10 rounded-md mt-10">
        <h2 className="text-2xl font-bold mb-4">Tweets Archivados</h2>
        <hr className="text-black bg-black mb-6 shadow-black shadow-2xl" />
        <ul className="mt-4">
          {tweetsArchived.map((tweet, i) => (
            <li key={i} className="bg-gray-200 p-2 rounded-md mb-2">
              {tweet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
