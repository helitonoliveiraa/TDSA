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

interface Comments {
  id: number;
  name: string;
  email: string;
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
  comments: Comments[];
  handleAddItem(dataItem: Item): void;
  handleDeleteItem(id: number): void;
}

const PostContext = createContext<PostContextData>({} as PostContextData);

const DataProvider: React.FC = ({ children }) => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [data, setData] = useState<Data[]>(() => {
    const posts = localStorage.getItem('@test:post');

    if (posts) {
      return JSON.parse(posts);
    }

    return [] as Data[];
  });

  console.log(data);
  // console.log(comments);

  // Load post
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        setData(json);
        // localStorage.setItem('@test:post', JSON.stringify(json));
      });
  }, []);

  // Load comments
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => {
        setComments(json);
        // localStorage.setItem('@test:post', JSON.stringify(json));
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

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(newPost => {
          console.log('Returnou da api', newPost);
          setData(prevState => [...prevState, newPost]);
        });
    },
    [data],
  );

  const handleDeleteItem = useCallback(id => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    setData(prevState => prevState.filter(item => item.id !== id));
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts: data,
        comments,
        handleAddItem,
        handleDeleteItem,
      }}
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
