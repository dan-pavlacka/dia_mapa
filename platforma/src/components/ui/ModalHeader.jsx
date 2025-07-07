'use client';


export default function ModalHeader({ titleIcon, titleText, onClose }) {
  return (
    <div>
    <div className={"modalHeader"}>
        
      <div className={"left"}>
        <img src={titleIcon} alt="" className={"modalIcon"} />
        <h3 className={"modalTitle"}>{titleText}</h3>
      </div>

      

      <button className={"closeButton"} onClick={onClose}>
        <img className={"modalIcon"} src="/assets/icons/krizek.svg" alt="Zavřít" />
      </button>
      
    </div>
    <div className={"divider"}></div>
    </div>
    
  );
}
