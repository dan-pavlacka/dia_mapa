'use client';

export default function CardSection3Col({ cards, CardComponent }) {
  return (
    <gov-grid gap="l" className="gov-card-grid">
      {cards.map((card, index) => (
        <CardComponent key={index} {...card} id={`card${index}`} />
      ))}
    </gov-grid>
  );
}
