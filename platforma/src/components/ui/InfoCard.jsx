'use client';


export default function InfoCard({ icon, label, value }) {
  return (
    <div className={"infoCard"}>
      <div className={"infoCardContent"}>
        <div className={"iconContainer"}>
          <img src={icon} alt="" className={"infoIcon"} />
        </div>
        <div className={"textContainer"}>
                <p className={"infoLabel"}>{label}</p>
      <p className={"infoValue"}>{value}</p>
        </div>
      </div>
    </div>
  );
}
