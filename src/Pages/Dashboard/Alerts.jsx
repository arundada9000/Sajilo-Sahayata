import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Alerts = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // TODO  backend API call:
    // fetch("/api/alerts")
    //   .then((res) => res.json())
    //   .then((data) => setAlerts(data));

    // Hardcoded sample alerts
    const data = [
      {
        id: "a1",
        title: "Fire in Bhaktapur Industrial Area",
        message: "Immediate evacuation recommended in Ward 5.",
        timestamp: "2025-06-07T10:30:00",
        level: "high", // high | medium | low
      },
      {
        id: "a2",
        title: "Flood Warning for Kathmandu Valley",
        message: "Heavy rainfall expected. Stay indoors.",
        timestamp: "2025-06-07T09:00:00",
        level: "medium",
      },
      {
        id: "a3",
        title: "Relief Distribution Ongoing in Lalitpur",
        message: "Rice and water available at Balkumari shelter.",
        timestamp: "2025-06-06T17:00:00",
        level: "low",
      },
      {
        id: "a4",
        title: "Relief Distribution Ongoing in Lalitpur",
        message: "Rice and water available at Balkumari shelter.",
        timestamp: "2025-06-06T17:00:00",
        level: "high",
      },
      {
        id: "a5",
        title: "Relief Distribution Ongoing in Lalitpur",
        message: "Rice and water available at Balkumari shelter.",
        timestamp: "2025-06-06T17:00:00",
        level: "medium",
      },
      {
        id: "a6",
        title: "Relief Distribution Ongoing in Lalitpur",
        message: "Rice and water available at Balkumari shelter.",
        timestamp: "2025-06-06T17:00:00",
        level: "high",
      },
    ];
    setAlerts(data);
  }, []);

  // Helper: format alert level
  const getAlertColor = (level) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800 border-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 border-green-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-400";
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t("alerts.title")}</h2>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-l-4 p-4 shadow-sm rounded-md ${getAlertColor(
              alert.level
            )}`}
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold">{alert.title}</h3>
              <span className="text-xs opacity-70">
                {new Date(alert.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-sm">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
