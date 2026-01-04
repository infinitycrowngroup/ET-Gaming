import React from "react";
import "./PCSpecs.css";

const SPECS = [
  { label: "CPU", value: "AMD Ryzen 5 7600" },
  { label: "GPU", value: "Nvidia Geforce RTX 4060" },
  { label: "RAM", value: "Gskill 16gb*2 DDR5" },
  { label: "Storage", value: "1TB NVMe SSD + 1TB Seagate HDD" },
  { label: "PSU", value: "ant esports fg650 gold" },
  { label: "Motherboard", value: "MSI b650 M gaming plus wifi" },
  { label: "Cooling", value: "CoolerMaster hyper620s" },
  { label: "Monitors", value: "Viewsonic VX2779 HD 27" },
  { label: "M&KY", value: " Livetech Evon Gaming combo" },
  { label: "Microphone", value: "Yeti Nano" },
  { label: "Webcam", value: "Logitech breo" }
];

export default function PcSpecs() {
  return (
    <section className="section-separated variant-rig py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="neon-title text-3xl md:text-4xl font-black mb-6 text-center">Our PC Sepecs</h2>
        <div className="rig-card glass rounded-2xl mx-auto flex flex-col md:flex-row items-center gap-6 p-6">

          <div className="rig-details w-full">
            <ul className="spec-list">
              {SPECS.map((s) => (
                <li key={s.label} className="spec-row">
                  <span className="spec-label">{s.label}</span>
                  <span className="spec-value">{s.value}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}
