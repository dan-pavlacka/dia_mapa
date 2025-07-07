'use client';

export default function CardSection2col({ cards, CardComponent }) {
  return (
    <gov-grid gap="l" className="gov-card-grid">
      {cards.map((card, index) => (
        <CardComponent key={index} {...card} />
      ))}
    </gov-grid>
  );
}
