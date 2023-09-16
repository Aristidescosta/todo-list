import React, { useCallback, useState } from "react";
import { MdCloudUpload } from "react-icons/md";

import { categories } from "../../../utils";
import "./style.css";

interface TaskModal {
  handleOpenModal: () => void;
  handleAddTask: (
    title: string,
    category: string,
    imageUrl: string,
    file: File
  ) => void;
}

export const TaskModal: React.FC<TaskModal> = ({
  handleOpenModal,
  handleAddTask,
}) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageName, setImageName] = useState("Sem nenhuma imagem selecionada");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!value || !category || !imageUrl) return;
      if (image) handleAddTask(value, category, imageUrl, image);
      setCategory("");
      setValue("");
      handleOpenModal();
    },
    [handleOpenModal, category, imageUrl, value, handleAddTask, image]
  );

  const handleSetImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.files) {
        const IMAGE = event.currentTarget.files[0];
        setImageName(IMAGE.name);
        setImage(IMAGE);
        setImageUrl(URL.createObjectURL(IMAGE));
      }
    },
    []
  );

  const handleClickInput = useCallback((element: HTMLElement | null) => {
    if (element) element.click();
  }, []);

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>Criar nova Tarefa</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o título da tarefa"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <div className="select">
            <div
              className="select-image"
              onClick={() => handleClickInput(document.querySelector(".input"))}
            >
              <input
                type="file"
                accept="image/*"
                className="input"
                onChange={handleSetImage}
                hidden
              />

              {image ? (
                <img src={imageUrl} alt={imageName} width={40} height={40} />
              ) : (
                <MdCloudUpload size={60} />
              )}
            </div>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value={category}>Selecione uma categoria</option>
              {categories.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button type="button" onClick={handleOpenModal}>
              Cancelar
            </button>
            <button type="submit">Criar tarefa</button>
          </div>
        </form>
      </div>
    </div>
  );
};
