import React, { useState, useCallback, useEffect } from "react";
import { MdCloudUpload } from "react-icons/md";

import { categories } from "../../../utils";
import { ITaskProps } from "../../../models/types";

interface TaskModal {
  handleCloseModal: () => void;
  handleUpdateTask: (
    title: string,
    category: string,
    imageUrl: string,
    file?: File
  ) => void;
  task: ITaskProps;
}

export const TaskModalEdit: React.FC<TaskModal> = ({
  handleCloseModal,
  task,
  handleUpdateTask,
}) => {
  const [value, setValue] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageName, setImageName] = useState("Sem nenhuma imagem selecionada");

  useEffect(() => {
    setCategory(task.category);
    setImageUrl(task.imageUrl);
    setValue(task.title);
  }, [task.category, task.imageUrl, task.title]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || !category || !imageUrl) {
      alert("Por favor, prencha todos os campos");
      return;
    }
    handleUpdateTask(value, category, imageUrl, image);
    setCategory("");
    setValue("");
    handleCloseModal();
  };

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
        <h1>Editar tarefa</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o título da tarefa"
            onChange={(e) => setValue(e.target.value)}
            defaultValue={task.title}
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

              {imageUrl ? (
                <img src={imageUrl} alt={imageName} width={40} height={40} />
              ) : (
                <MdCloudUpload size={60} />
              )}
            </div>
            <select
              defaultValue={task.category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={category}>Selecione uma categoria</option>
              {categories.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button type="button" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="submit">Atualiar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
