import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { FiChevronLeft } from 'react-icons/fi';

import { useData } from '../../Context/index';

import { CustomModal, Button, FormWrapper } from './styles';

interface ModalPropss {
  open: boolean;
  handleClose(): void;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório.'),
  email: Yup.string().email().required('O e-mail é obrigatório.'),
  body: Yup.string().required('O conteúdo é obrigatório.'),
});
const Comment: React.FC<ModalPropss> = ({ open, handleClose, ...rest }) => {
  const { handleAddWithComment } = useData();
  return (
    <>
      <CustomModal
        {...rest}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <FormWrapper>
          <div>
            <h1>Comentário</h1>
            <button type="button" onClick={handleClose}>
              <FiChevronLeft size={20} />
              Voltar
            </button>
          </div>

          <Formik
            initialValues={{
              name: '',
              email: '',
              body: '',
            }}
            validationSchema={schema}
            onSubmit={values => {
              handleAddWithComment({
                name: values.name,
                email: values.email,
                body: values.body,
              });
            }}
          >
            <Form>
              <Field id="name" name="name" type="text" placeholder="Nome" />

              <Field rows={5} id="email" name="email" placeholder="E-mail" />

              <Field rows={5} id="body" name="body" placeholder="Conteúdo" />

              <Button type="submit">Inserir</Button>
            </Form>
          </Formik>
        </FormWrapper>
      </CustomModal>
    </>
  );
};
export default Comment;
