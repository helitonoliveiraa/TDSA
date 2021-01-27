import React, { useState, useCallback } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { FiChevronRight } from 'react-icons/fi';

import { useData } from '../../Context/index';
import Comment from '../Comment';

import {
  CustomModal,
  SaveButton,
  FormWrapper,
  CloseButton,
  CommentButton,
} from './styles';

interface ModalPropss {
  open: boolean;
  handleClose(): void;
  type: string;
}
const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório.'),
  body: Yup.string().required('O conteúdo é obrigatório.'),
});
// eslint-disable-next-line prettier/prettier
const Post: React.FC<ModalPropss> = ({
  type, open, handleClose, ...rest
}) => {
  const [openModal, setOpen] = useState(false);
  const handleModal = useCallback(() => {
    setOpen(!openModal);
  }, [openModal]);

  const { handleAddItem, handleUpdatePost, tempor } = useData();

  return (
    <>
      <Comment open={openModal} handleClose={handleModal} />
      <CustomModal
        {...rest}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <FormWrapper>
          <div>
            <h1>{type === 'editing' ? 'Editando' : 'Inserindo novo post'}</h1>
            {type === 'editing' && (
              <CommentButton type="button" onClick={handleModal}>
                Comentário
                <FiChevronRight size={20} />
              </CommentButton>
            )}
          </div>

          {type === 'editing' ? (
            <Formik
              initialValues={{
                title: tempor.title,
                body: tempor.body,
              }}
              validationSchema={schema}
              onSubmit={values => {
                handleUpdatePost({
                  id: tempor.id,
                  title: values.title,
                  body: values.body,
                  userId: tempor.userId,
                });

                handleClose();
              }}
            >
              <Form>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Título"
                />

                <Field rows={5} id="body" name="body" placeholder="Conteúdo" />

                <div>
                  <CloseButton
                    type="button"
                    onClick={handleClose}
                    color="secondary"
                  >
                    Fechar
                  </CloseButton>

                  <SaveButton type="submit">Salvar</SaveButton>

                  <SaveButton type="submit" onClick={handleModal}>
                    Salvar e Continuar
                  </SaveButton>
                </div>
              </Form>
            </Formik>
          ) : (
            <Formik
              initialValues={{
                title: '',
                body: '',
              }}
              validationSchema={schema}
              onSubmit={values => {
                handleAddItem({
                  title: values.title,
                  body: values.body,
                });
              }}
            >
              <Form>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Título"
                />

                <Field rows={5} id="body" name="body" placeholder="Conteúdo" />

                <div>
                  <CloseButton type="button" onClick={handleClose}>
                    Fechar
                  </CloseButton>

                  <SaveButton type="submit">Salvar</SaveButton>

                  <SaveButton type="submit" onClick={handleModal}>
                    Salvar e Continuar
                  </SaveButton>
                </div>
              </Form>
            </Formik>
          )}
        </FormWrapper>
      </CustomModal>
    </>
  );
};

export default Post;
