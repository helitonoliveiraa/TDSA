// eslint-disable-next-line prettier/prettier
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';

interface Item {
  title: string;
  body: string;
}

interface Data {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostContextData {
  posts: Data[];
  handleAddItem(dataItem: Item): void;
  handleDeleteItem(id: number): void;
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

  const handleAddItem = useCallback(
    ({ title, body }) => {
      const newItem = {
        id: data[data.length - 1].id + 1,
        title,
        body,
        userId: data[data.length - 1].userId + 1,
      };

      setData(prevState => [...prevState, newItem]);
    },
    [data],
  );

  const handleDeleteItem = useCallback(id => {
    setData(prevState => prevState.filter(item => item.id !== id));
  }, []);

  return (
    <PostContext.Provider
      value={{ posts: data, handleAddItem, handleDeleteItem }}
    >
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
