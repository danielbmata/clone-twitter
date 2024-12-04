import { Sidebar } from './components/Sidebar';
import { Tweet } from './components/Tweet';
import { TwitterForm } from './components/TwitterForm';
import { v4 } from 'uuid';
import { getAvatar, getRandomImage } from './utils/generateImages';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      addNewRandomTweets();
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const addNewRandomTweets = () => {
    const randomTweets = [
      'Acabei de me juntar à galera no Twitter! Ansioso para compartilhar e aprender com todos. 🚀 #NovoPorAqui',
      'Mais uma jornada de codificação começando. Vamos que vamos, programadores! 👨‍💻 #DesenvolvedorEmAção',
      'Quem mais vai ficar acordado para observar as estrelas cadentes essa noite? 🌌 #NoiteMágica',
      'Lembre-se: a gentileza é a chave para um dia melhor. Trate-se bem e espalhe boas vibrações! 🌸 #AmorPróprio',
      'Dica rápida: nunca subestime o poder de uma boa organização de arquivos. Seu futuro eu vai agradecer! 🗂️ #DicaDeProdutividade',
    ];
    const randomTweet =
      randomTweets[Math.floor(Math.random() * randomTweets.length)];
    addNewTweet(randomTweet, Math.random() > 0.7);
  };
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
      }),
      image: includeImage ? getRandomImage() : null,
      likes: 0,
      retweets: 0,
      comments: 0,
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
        <TwitterForm
          onTweet={(content) => addNewTweet(content, Math.random() > 0.6)}
        />
        <div>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </main>
      <aside className='hidden xl:block w-80 px-4'>
        <div className='sticky top-0 pt-2'>
          <div className='relative'>
            <FontAwesomeIcon icon={faSearch} className='absolute top-3 left-3 text-gray-500'/>
            <input type="text" placeholder='Search Twitter' className='w-full bg-gray-800 text-white rounded-full outline-none py-2 pl-10 pr-4'/>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;
