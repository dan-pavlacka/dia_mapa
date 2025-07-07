'use client';


export default function AddRecordButton({ text, onClick, variant = 'default' }) {
  const variantClass = variant || '';

  const iconSrc = variant === 'emptyState'
    ? '/assets/icons/plus.svg'
    : '/assets/icons/plus_green.svg';

  return (
    <button className={`${"addButton"} ${variantClass}`} onClick={onClick}>
      <img src={iconSrc} alt="" className={"buttonIcon"} />
      {text}
    </button>
  );
}
