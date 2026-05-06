import React, { useState, useEffect, useMemo } from "react";
import {
  Database,
  Download,
  Copy,
  Search,
  CheckCircle2,
  AlertCircle,
  RefreshCcw,
  ShieldCheck,
  FileJson,
  Table as TableIcon,
} from "lucide-react";
import { toast } from "react-toastify";

const SQL = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/tbl_cctv.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id?.toString().includes(searchTerm),
    );
  }, [data, searchTerm]);

  const sqlInsertString = useMemo(() => {
    if (data.length === 0) return "";

    const CHUNK_SIZE = 100;
    let sql = `-- SQL Generated on ${new Date().toLocaleString()}\n`;
    sql += `-- Total Records: ${data.length}\n\n`;

    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      const chunk = data.slice(i, i + CHUNK_SIZE);
      sql +=
        "INSERT INTO tbl_cctv (cctv_id, district_id, police_station_id, type, date, name, owner, mobile, latitude, longitude, created_by, address, remarks, pi_url_1, pi_url_2  ) VALUES \n";
      sql +=
        chunk
          .map((item) => {
            const escape = (val) => (val || "").toString().replace(/'/g, "''");
            
            const ownerName = escape(item.ownerName);
            const deviceName = escape(item.deviceName);
            const address = escape(item.address);
            const remark = escape(item.remark);
            const createdAt = escape(item.createdAt);
            const piUrl1 = escape(item.cameraPiUrl);
            const piUrl2 = escape(item.cameraPiUrl2);
            const mobile = escape(item.pointOfContact);

            let type = "Other";
            if (item.cameraTypeId_id === 1) {
              type = "Private";
            } else if (item.cameraTypeId_id === 2) {
              type = "Govt";
            }

            return `  ('${item.id}', '${item.districtId_id}', '${item.thanaId_id}', '${type}', '${createdAt}', '${deviceName}', '${ownerName}', '${mobile}', '${item.latitude}', '${item.longitude}', '${item.createdBy_id}', '${address}', '${remark}', '${piUrl1}', '${piUrl2}' )`;
          })
          .join(",\n") + ";\n\n";
    }

    return sql;
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlInsertString);
    setCopying(true);
    toast.success("SQL copied to clipboard!");
    setTimeout(() => setCopying(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([sqlInsertString], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "tbl_cctv.sql";
    document.body.appendChild(element);
    element.click();
    toast.info("Downloading SQL file...");
  };

  if (loading) {
    return (
      <div className="d-flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
          <Database className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 h-10 w-10" />
        </div>
        <p className="mt-6 text-slate-600 font-medium animate-pulse">
          Loading dataset...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-2xl mx-auto mt-20">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
          <AlertCircle className="text-red-500 h-6 w-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-red-800 font-bold text-lg">
              Data Fetching Error
            </h3>
            <p className="text-red-600 mt-1">{error}</p>
            <button
              onClick={fetchData}
              className="mt-4 flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              <RefreshCcw size={18} /> Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                SQL Data Exporter
              </h1>
              <div className="flex items-center gap-2 text-slate-500 mt-1">
                <FileJson size={14} />
                <span className="text-sm font-medium">
                  tbl_setting_police_station.json
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                <ShieldCheck size={14} className="text-green-500" />
                <span className="text-sm font-semibold text-green-600 uppercase tracking-wider text-[10px]">
                  Production Data
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-100 mt-4">
            <button
              onClick={handleCopy}
              className="group btn btn-default flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 px-5 py-2.5 rounded-xl transition-all duration-300 shadow-sm"
            >
              {copying ? (
                <CheckCircle2 size={18} className="text-green-500" />
              ) : (
                <Copy size={18} className="group-hover:text-blue-600" />
              )}
              <span className="font-semibold">Copy SQL</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex btn btn-primary items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-slate-200"
            >
              <Download size={18} />
              <span className="font-semibold">Download .sql</span>
            </button>
          </div>
        </header>

        {/* Generated SQL Preview Card */}
        <div className="mb-10 group">
          <div className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800 relative">
            <div className="absolute top-4 right-6 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
            </div>

            <div className="p-8 mt-2">
              <pre className="font-mono text-sm leading-relaxed text-blue-300/90 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <code>{sqlInsertString}</code>
              </pre>
            </div>

            <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
              <p className="text-xs text-slate-500 font-mono italic">
                -- Automatically batched in groups of 100 for optimal
                performance
              </p>
              <span className="text-blue-400 text-xs font-bold">
                {data.length} Records Detected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQL;
