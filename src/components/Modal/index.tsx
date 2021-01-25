import React from 'react';
import { useFormik } from 'formik';

import { useData } from '../../Context/index';

import { CustomModal, Button, FormWrapper } from './styles';

interface ModalPropss {
  open: boolean;
  handleClose(): void;
  type: 'insertion' | 'editing';
}

// eslint-disable-next-line prettier/prettier
const Modal: React.FC<ModalPropss> = ({
  type, open, handleClose, ...rest
}) => {
  const { handleAddItem } = useData();

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },

    onSubmit: ({ title, body }) => {
      if (!title || !body) {
        alert('Todos os campos são obrigatórios');
        return;
      }

      handleAddItem({
        title,
        body,
      });

      handleClose();
    },
  });

  return (
    <CustomModal
      {...rest}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <FormWrapper>
        <h1>{type === 'editing' ? 'Editando' : 'Inserindo novo item'}</h1>

        <form onSubmit={formik.handleSubmit}>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Título"
            onChange={formik.handleChange}
            value={formik.values.title}
          />

          <textarea
            rows={5}
            id="body"
            name="body"
            placeholder="Conteúdo"
            onChange={formik.handleChange}
            value={formik.values.body}
          />

          <Button type="submit">Submit</Button>
        </form>

        <Button type="button" onClick={handleClose}>
          Close
        </Button>
      </FormWrapper>
    </CustomModal>
  );
};

export default Modal;
