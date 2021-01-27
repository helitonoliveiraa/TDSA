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
  postId: number;
}

interface CreateComment {
  name: string;
  email: string;
  body: string;
}

interface PostData {
  id: number;
  title: string;
  body: string;
  userId: number;
}
interface PostContextData {
  loading: boolean;
  posts: PostData[];
  comments: Comments[];
  tempor: PostData;
  handleAddItem(dataItem: Item): void;
  handleAddWithComment(commentData: CreateComment): void;
  handleDeleteItem(id: number): void;
  handleEdit(id: number): PostData | undefined;
  handleUpdatePost(postData: PostData): void;
}

const PostContext = createContext<PostContextData>({} as PostContextData);

const DataProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [tempor, setTempor] = useState<PostData>({} as PostData);
  const [comments, setComments] = useState<Comments[]>([]);
  const [postsData, setPostsData] = useState<PostData[]>(() => {
    const posts = localStorage.getItem('@test:post');

    if (posts) {
      return JSON.parse(posts);
    }

    return [] as PostData[];
  });

  // Load post
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        setPostsData(json);
      });
  }, []);

  // Load comments
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => {
        setComments(json);
        setLoading(false);
      });
  }, []);

  const handleAddItem = useCallback(
    ({ title, body }) => {
      const newItem = {
        id: postsData[postsData.length - 1].id + 1,
        title,
        body,
        userId: postsData[postsData.length - 1].userId + 1,
      };

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then((newPost: PostData) => {
          setPostsData(prevState => [...prevState, newPost]);
        });
    },
    [postsData],
  );

  const handleAddWithComment = useCallback(
    ({ name, email, comment }) => {
      const postId = postsData[postsData.length - 1].id;

      const postWithComment = {
        name,
        email,
        body: comment,
        postId,
      };
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(postWithComment),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(commentResponse => {
          setComments(prevState => [...prevState, commentResponse]);
        });
    },
    [postsData],
  );

  const handleDeleteItem = useCallback(id => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    setPostsData(prevState => prevState.filter(item => item.id !== id));
  }, []);

  const handleEdit = useCallback(
    (id): PostData | undefined => {
      const post = postsData.find(p => p.id === id);

      if (post) {
        setTempor(post);
      }
      return post;
    },
    [postsData],
  );

  const handleUpdatePost = useCallback(
    (postData: PostData) => {
      const { id, title, body, userId } = postData;

      fetch(`https://jsonplaceholder.typicode.com/posts/${postData.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id,
          title,
          body,
          userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(res => {
          const updatedPost = postsData.map(post =>
            post.id === id ? res : post,
          );

          setPostsData(updatedPost);
        });
    },
    [postsData],
  );

  return (
    <PostContext.Provider
      value={{
        loading,
        posts: postsData,
        comments,
        tempor,
        handleAddItem,
        handleAddWithComment,
        handleDeleteItem,
        handleEdit,
        handleUpdatePost,
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
