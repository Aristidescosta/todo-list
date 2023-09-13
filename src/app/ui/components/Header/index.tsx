import hamburguerIcon from "../../../../assets/bell-icon.png";
import bellIcon from "../../../../assets/hamburguer-button.png";
import avatar from "../../../../assets/avatar.webp";

import "./style.css";

export const Header = () => {
  return (
    <div className="container">
      <div>
        <img className="icon" src={bellIcon} alt="Ícone de botão hamburguer" />
      </div>

      <div className="avatar">
        <img
          src={avatar}
          className="icon"
          alt="Ícone do batman"
          style={{ width: 128, height: 128 }}
        />
        <p>Olá Aristides</p>
      </div>

      <div>
        <img
          className="icon"
          src={hamburguerIcon}
          alt="Ícone representando um sino"
        />
      </div>
    </div>
  );
};
