import oopsImg from "../../../../assets/oops.png";

export const Oops = () => {
  return (
    <div className="center">
      <h3>Sem novas tarefas</h3>
      <img src={oopsImg} style={{ width: 320, alignSelf: "center" }} alt="" />
      <p className="title">Sem tarefas adicionadas</p>
      <p>Toque no botão "+" para adicionar uma nova tarefa</p>
    </div>
  );
};
