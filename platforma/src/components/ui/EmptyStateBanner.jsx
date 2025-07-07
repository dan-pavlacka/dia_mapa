'use client';

import AddRecordButton from '@/components/ui/AddRecordButton';

export default function EmptyStateBanner({ 
  message = 'Pro tuto sekci nejsou k dispozici žádné záznamy.', 
  buttonText, 
  onButtonClick 
}) {
  return (
    <div className={"bannerWrapper"}>
      <img
        src="/assets/icons/noResult.svg"
        alt="Žádné záznamy"
        className={"noResultsIcon"}
      />
      <div className={"textContainer"}>
        <div className={"topLine"}>
          {message}
        </div>

        {buttonText && onButtonClick && (
          <div style={{ marginTop: '12px' }}>
            <AddRecordButton
              text={buttonText}
              onClick={onButtonClick}
              variant="emptyState"
            />
          </div>
        )}
      </div>
    </div>
  );
}
