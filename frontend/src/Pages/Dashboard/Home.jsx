import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import usePreferences from "../../stores/UsePreference";
import { useLocalGovernment } from "../../hooks/useLocalGovernment";

const Dashboard = () => {
  const { t } = useTranslation();
  const [incidents, setIncidents] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const localGov = useLocalGovernment();

  // Hardcoded demo data (replace this with backend call)
  useEffect(() => {
    // Replace this with actual backend fetch:
    // const res = await fetch("/api/incidents");
    // const data = await res.json();
    const data = [
      {
        _id: "1",
        type: "fire",
        description: "Fire broke out near the warehouse",
        timestamp: "2025-06-06T15:30:00",
        photo:
          "https://martech.org/wp-content/uploads/2014/08/photos-images-pictures-ss-1920.jpg",
      },
      {
        _id: "2",
        type: "flood",
        description: "Heavy rain flooded the street",
        timestamp: "2025-06-07T08:00:00",
        photo:
          "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
      },
      {
        _id: "3",
        type: "landslide",
        description: "Landslide blocked highway route",
        timestamp: "2025-06-05T10:00:00",
        photo: "https://cdn.wallpapersafari.com/44/55/kp50Ri.jpg",
      },
    ];
    setIncidents(data);
  }, []);

  // Filter and sort logic
  const filteredIncidents = incidents
    .filter((incident) => filterType === "all" || incident.type === filterType)
    .sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp)
    );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header + Filters */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t("mapit.filterLabel")}</h2>
        <div className="flex gap-2 flex-wrap">
          <p className="mt-4 text-green-600">
            {localGov
              ? `You are in: ${localGov}`
              : "Detecting your local government..."}
          </p>
          {/* Incident Type Filter */}
          <select
            className="border px-3 py-1 rounded"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">{t("mapit.selectAll")}</option>
            <option value="fire">{t("incidentTypes.fire")}</option>
            <option value="flood">{t("incidentTypes.flood")}</option>
            <option value="landslide">{t("incidentTypes.landslide")}</option>
            <option value="accident">{t("incidentTypes.accident")}</option>
            <option value="garbage">{t("incidentTypes.garbage")}</option>
            <option value="relief">{t("incidentTypes.relief")}</option>
            <option value="other">{t("incidentTypes.other")}</option>
          </select>

          {/* Sort Order Filter */}
          <select
            className="border px-3 py-1 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">{t("Latest")}</option>
            <option value="oldest">{t("Oldest")}</option>
          </select>
        </div>
      </div>

      {/* Incident Feed */}
      <div className="space-y-6">
        {filteredIncidents.map((incident) => (
          <div
            key={incident._id}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
          >
            {incident.photo && (
              <img
                src={incident.photo}
                alt="Incident"
                className="w-full h-auto object-cover"
              />
            )}
            <div className="p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {new Date(incident.timestamp).toLocaleString()}
              </div>
              <h3 className="text-lg font-semibold capitalize">
                {t(`incidentTypes.${incident.type}`)}
              </h3>
              <p className="text-gray-800 dark:text-gray-200 mt-2">
                {incident.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
