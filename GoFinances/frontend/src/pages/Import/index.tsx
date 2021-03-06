import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
// import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();
    uploadedFiles.map(file => data.append('file', file.file, file.name));

    try {
      await api.post('/transactions/import', data);
      toast.success('Arquivo enviado com sucesso !');
      history.goBack();
    } catch (err) {
      toast.error('Erro ao enviar arquivo, tente novamente !');
    }
  }

  function submitFile(files: File[]): void {
    const newFiles: FileProps[] = files.map(file => {
      const fileProp = {
        file,
        name: file.name,
        readableSize: file.size.toString(),
      } as FileProps;

      return fileProp;
    });
    setUploadedFiles(newFiles);
  }
  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
