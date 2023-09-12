import "./style.css";

interface IButtonAddProps {
  handleOpenModal: () => void;
}

export const ButtonAdd: React.FC<IButtonAddProps> = ({ handleOpenModal }) => {
  return (
    <button className="button" onClick={handleOpenModal}>
      +
    </button>
  );
};
