'use client';

import Modal from '@/components/ui/Modal'; // univerzální Modal (obal)


export default function DetailModal({ isOpen, onClose, title, rows }) {
  if (!rows || rows.length === 0) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideDefaultCloseIcon={true}>
      <div className={"detailModalContent"}>
        <img
          src="/assets/icons/krizek.svg"
          alt="Zavřít"
          className={"closeIcon"}
          onClick={onClose}
        />

        <h2>{title}</h2>

        <div className={"divider"}></div>

        <table className={"detailTable"}>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td className={"detailLabel"}>{row.label}</td>
                <td className={"detailValue"}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={"divider"}></div>

        <button className={"detailCloseButton"} onClick={onClose}>
          Zavřít
        </button>
      </div>
    </Modal>
  );
}
