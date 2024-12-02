import { Sidebar } from './components/Sidebar';
import { Tweet } from './components/Tweet';
import { TwitterForm } from './components/TwitterForm';
import { v4 } from 'uuid';
import { getAvatar, getRandomImage } from './utils/generateImages';
import { useState } from 'react';

function App() {
  const [tweets, setTweets] = useState([]);
  const addNewTweet = (content, includeImage = false) => {
    const newTweet = {
      id: v4(),
      name: 'User',
      username: `user${Math.floor(Math.random() * 1000)}`,
      avatar: getAvatar(`user${Math.floor(Math.random() * 1000)}@email.com`),
      content,
      time: new Date().toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        image: includeImage ? getRandomImage() : null,
        likes: 0,
        retweets: 0,
        comments: 0,
      }),
    };
    setTweets((prevTweets) => [newTweet, ...prevTweets]);
  };
  return (
    <div className="flex mx-auto max-w-7xl">
      <Sidebar />
      <main className="flex-grow border-l border-r border-gray-700 max-w-xl">
        <header className="sticky top-0 z-10 bg-twitter-background bg-opacity-80 backdrop-blur-sm">
          <h2 className="px-4 py-3 text-xl font-bold">For You</h2>
        </header>
        <TwitterForm />
        <div>
          <Tweet />
        </div>
      </main>
    </div>
  );
}

export default App;
