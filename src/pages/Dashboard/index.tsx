/* eslint-disable operator-linebreak */
import React, { useCallback, useState } from 'react';
import { FiDelete, FiEdit3, FiPlus } from 'react-icons/fi';

import { useData } from '../../Context/index';

import Post from '../../components/Post';

import {
  Container,
  Header,
  TableContainer,
  CustomTable,
  Background,
  TableLine,
  Photo,
  WrapperContent,
  WrapperButton,
  WrapperComment,
  Button,
} from './styles';

interface Type {
  type: 'editing' | 'insertion';
}

const Dashboard: React.FC = () => {
  // eslint-disable-next-line prettier/prettier
  const {
    posts, comments, handleDeleteItem, handleEdit,
  } = useData();
  const [type, setType] = useState('insertion');
  const [open, setOpen] = useState(false);
  const handleModal = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleEditPost = useCallback(
    (id: number) => {
      handleEdit(id);
      setType('editing');
      handleModal();
    },
    [handleEdit, handleModal],
  );

  return (
    <Container>
      <Header>
        <div>
          <h1>Post Item</h1>

          <Button onClick={handleModal}>
            <FiPlus size={20} />
            Adicionar
          </Button>
        </div>
      </Header>

      <Post type={type} open={open} handleClose={handleModal} />

      <TableContainer>
        <CustomTable>
          <tbody>
            {posts.map(post => (
              <TableLine key={`${post.id + Math.random() * 11}`}>
                <td>
                  <div>
                    <Photo
                      src="https://ui-avatars.com/api/?background=random"
                      alt={post.title}
                    />

                    <Background>
                      <WrapperContent>
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                      </WrapperContent>

                      <WrapperButton>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(post.id)}
                        >
                          <FiDelete size={20} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEditPost(post.id)}
                        >
                          <FiEdit3 size={20} />
                        </button>
                      </WrapperButton>
                    </Background>
                  </div>

                  {comments.map(comment => {
                    if (post.id === comment.postId) {
                      return (
                        <WrapperComment
                          key={`${comment.id + Math.random() * 10}`}
                        >
                          <img
                            src={`https://ui-avatars.com/api/?name=${comment.name}`}
                            alt={comment.name}
                          />

                          <div>
                            <strong>{comment.name}</strong>
                            <span>{comment.email}</span>
                            <p>{comment.body}</p>
                          </div>
                        </WrapperComment>
                      );
                    }
                    return null;
                  })}
                </td>
              </TableLine>
            ))}
          </tbody>
        </CustomTable>
      </TableContainer>
    </Container>
  );
};
export default Dashboard;
