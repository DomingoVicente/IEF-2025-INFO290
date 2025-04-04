// FileUploadSection.tsx
import React, { useState, useEffect, useRef, ChangeEvent, DragEvent } from 'react';
import { Upload } from 'lucide-react';
import useExcelSheets from './useExcelSheets';
import OjoIcon from "../../assets/Icon/ojo.svg";
import basuraIcon from "../../assets/Icon/basura.svg";
import descargaIcon from "../../assets/Icon/descarga.svg";
import { fetchFiles } from '../../api/home/FileUploadSections';
import { handleFileDrop, handleFileInput, handleFileUpload, handleFileDelete, handleFileDownload } from './fileHandlers';
import ErrorAlert from '../Alerts/ErrorAlert';

interface FileUploadSectionProps {
  title: string;
  fileType: string;
  fetchFilesFromServer: () => void;
  onFileSelect: (fileName: string | null) => void;
}

interface FileItem {
  name: string;
  createdAt: string;
  modifiedAt: string;
  size: number;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = React.memo(({
  title,
  fileType,
  fetchFilesFromServer,
  onFileSelect,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [filesList, setFilesList] = useState<FileItem[]>([]);

  const { excelSheets, isMenuOpen, isLoading, selectedSheet, toggleMenuAndFetchSheets, handleSheetSelect } = useExcelSheets(file?.name || null);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        toggleMenuAndFetchSheets(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleMenuAndFetchSheets]);

  useEffect(() => {
    const fetchFilesList = async () => {
      try {
        const files = await fetchFiles();
        if (Array.isArray(files)) {
          setFilesList(files);
        } else {
          console.error('Fetched files is not an array:', files);
          setFilesList([]);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
        setFilesList([]);
      }
    };
    fetchFilesList();
  }, []);

  // Filter files based on fileType, ensuring we have valid strings
    const filteredFilesList = filesList.filter((file: FileItem) => {
      return file.name.toLowerCase().includes(fileType.toLowerCase());
    });


  const handleDropWrapper = (event: DragEvent<HTMLDivElement>) => {
    handleFileDrop(event, setFile, setMessage, setIsError, onFileSelect);
  };

  const handleFileInputWrapper = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileInput(event, setFile, setMessage, setIsError, onFileSelect);
  };

  const handleUploadWrapper = async () => {
    try {
      await handleFileUpload(
        file,
        fileType,
        setMessage,
        setIsError,
        setUploaded,
        fetchFilesFromServer,
        onFileSelect
      );
      setMessage(`El archivo "${file?.name}" ha sido subido correctamente.`);
      setIsError(false);
      setShowAlert(true);
    } catch (error) {
      setMessage('Error al subir el archivo. Por favor, inténtelo nuevamente.');
      setIsError(true);
      setShowAlert(true);
      console.error(error);
    }
  };

  const handleDeleteWrapper = async () => {
    if (!file) {
      setMessage('No hay archivo seleccionado para eliminar.');
      setIsError(true);
      setShowAlert(true);
      return;
    }

    try {
      await handleFileDelete(
        file,
        setMessage,
        setIsError,
        setFile,
        setUploaded,
        fetchFilesFromServer,
        onFileSelect
      );
      setMessage(`El archivo "${file.name}" ha sido eliminado correctamente.`);
      setIsError(false);
      setShowAlert(true);
    } catch (error) {
      setMessage('Error al eliminar el archivo. Por favor, inténtelo nuevamente.');
      setIsError(true);
      setShowAlert(true);
      console.error(error);
    }
  };

  const handleDownloadWrapper = async () => {
    if (!file) {
      setMessage('No hay archivo seleccionado para descargar.');
      setIsError(true);
      setShowAlert(true);
      return;
    }

    try {
      await handleFileDownload(file, setMessage, setIsError);
      setMessage(`El archivo "${file.name}" se está descargando.`);
      setIsError(false);
      setShowAlert(true);
    } catch (error) {
      setMessage('Error al descargar el archivo. Por favor, inténtelo nuevamente.');
      setIsError(true);
      setShowAlert(true);
      console.error(error);
    }
  };

  return (
    <div
      className="bg-[#F0EAD6] rounded-lg shadow-md overflow-hidden mb-6"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropWrapper}
    >
      {showAlert && (
        <ErrorAlert
          message={message}
          type={isError ? 'error' : 'success'}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="bg-navegator p-4">
        <h2 className="text-lg font-semibold text-[#2F4F4F]">{title}</h2>
      </div>
      <div className="p-6 border-2 border-dashed border-bg-navegator rounded-b-lg">
      {uploaded ? (
        <div className="flex justify-between items-center bg-navegator rounded-xl p-2">
          <p className="font-semibold truncate flex-grow pr-2">
            {file?.name}
          </p>
          <div className="flex items-center space-x-2">
          <button
              ref={buttonRef}
              onClick={() => toggleMenuAndFetchSheets(!isMenuOpen)}  // Alterna el estado del menú
              className="text-[#2F4F4F] hover:text-[#3D6F6F] p-2 rounded-md"
              title="Seleccionar hoja"
            >
              {excelSheets.length === 0 ? (
                <span>Cargar hojas</span>
              ) : (
                <img src={OjoIcon} alt="View" className="w-6 h-6" />
              )}
            </button>

        {isMenuOpen && excelSheets.length > 0 && (
          <div ref={menuRef} className="absolute bg-white shadow-lg rounded-md mt-2 w-48 z-10"
          style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <ul className="py-2">
              {excelSheets.map((sheet, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-sm text-[#2F4F4F] hover:bg-[#C1E1C1] cursor-pointer"
                  onClick={() => handleSheetSelect(sheet)}
                >
                  {sheet}
                </li>
              ))}
            </ul>
          </div>
        )}

      {isLoading && <p>...</p>}
            
            <button
              onClick={handleDeleteWrapper}
              className="text-[#2F4F4F] hover:text-[#3D6F6F]"
              title="Eliminar"
            >
              <img src={basuraIcon  } alt="Delete" className="w-6 h-6" />
              <span className="sr-only">Eliminar</span>
            </button>
            <button
              onClick={handleDownloadWrapper}
              className="text-[#2F4F4F] hover:text-[#3D6F6F]"
              title="Descargar"
            >
              <img src={descargaIcon} alt="Download" className="w-6 h-6" />
              <span className="sr-only">Descargar</span>
            </button>
          </div>
        </div>
      ) : file ? (

          <div className="flex flex-col items-center justify-center rounded-xl">
            <p className="bg-navegator font-semibold rounded-xl p-2 pl-4 pr-4">
              Archivo: {file.name}
            </p>
            <button onClick={handleUploadWrapper} className="text-black pt-2 rounded-xl">
              <p className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-[#F0EAD6] bg-[#2F4F4F] hover:bg-[#3D6F6F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F4F4F]">
                Subir
              </p>
            </button>
            id="upload-button"
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-[#2F4F4F]" />
            <p className="mt-1 text-sm text-[#2F4F4F]">
              Arrastra y suelta tu archivo aquí, o
            </p>
            <label
              htmlFor={`file-input-${fileType}`}
              className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-[#F0EAD6] bg-[#2F4F4F] hover:bg-[#3D6F6F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F4F4F]"
            >
              <span>Seleccionar archivo</span>
              <input
                id={`file-input-${fileType}`}
                name={`file-input-${fileType}`}
                type="file"
                className="sr-only"
                accept=".xlsx"
                onChange={(event) => handleFileInputWrapper(event)}
              />
            </label>
          </div>
        )}
      </div>
      <div className="bg-gradient-to-r from-[#C1E1C1] to-[#A3C1A3] px-4 py-3 sm:px-6 rounded-lg">
      <select
        onChange={(e) => {
          const selectedFilename = e.target.value;
          if (selectedFilename) {
            const selectedFile = { name: selectedFilename };
            setFile(selectedFile as File);
            setUploaded(true);
            if (onFileSelect) {
              onFileSelect(selectedFilename);
            }
          } else {
            setFile(null);
            setUploaded(false);
            if (onFileSelect) {
              onFileSelect(null);
            }
          }
        }}
        className="w-full max-w-md mx-auto block pl-3 pr-10 py-2 text-base border-0 focus:outline-none focus:ring-2 focus:ring-[#C1E1C1] sm:text-sm rounded-full bg-[#F0EAD6] text-[#2F4F4F] shadow-md transition-all hover:shadow-lg text-center"
        style={{ textAlignLast: 'center' }} 
        value={file && file.name ? file.name : ''}
      >
        <option value="">Seleccionar archivo cargado</option>
        {filteredFilesList.map((file: FileItem, index) => (
          <option key={index} value={file.name}>
            {file.name}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
});
export default FileUploadSection;
