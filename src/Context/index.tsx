// eslint-disable-next-line prettier/prettier
import React, {
  createContext, useState, useEffect, useContext,
} from 'react';

interface Data {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostContextData {
  posts: Data[];
}

const PostContext = createContext<PostContextData>({} as PostContextData);

const DataProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<Data[]>(() => {
    const posts = localStorage.getItem('@test:post');

    if (posts) {
      return JSON.parse(posts);
    }

    return [] as Data[];
  });

  console.log(data);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        setData(json);
        localStorage.setItem('@test:post', JSON.stringify(json));
      });
  }, []);

  return (
    <PostContext.Provider value={{ posts: data }}>
      {children}
    </PostContext.Provider>
  );
};

function useData(): PostContextData {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('useData must to be used within a DataProvider');
  }

  return context;
}

export { DataProvider, useData };
