import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");
  const [scenario, setScenario] = useState("");
  const [response, setResponse] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const scenarios = [
    {
      category: "מכירות",
      sub: "טיפול בהתנגדויות",
      topic: "מחיר",
      difficulty: "מתקדם"
    },
    {
      category: "שירות",
      sub: "גילוי אמפתיה",
      topic: "לקוח חוייב במחיר גבוה",
      difficulty: "קל"
    }
  ];

  const fakeLogin = (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    setUser(name);
    setView("home");
  };

  const startSimulation = (s) => {
    setScenario(s);
    setView("simulation");
  };

  const analyzeResponse = () => {
    const feedback = [];
    if (response.length < 30) feedback.push("תארך את התשובה שלך");
    if (!response.includes("אמפתיה")) feedback.push("הוסף אמפתיה");
    if (!response.includes("מחיר")) feedback.push("הזכר את נושא המחיר");
    setAnalysis(feedback);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {view === "login" && (
        <form onSubmit={fakeLogin} className="space-y-4">
          <h1 className="text-2xl font-bold">התחברות</h1>
          <input name="username" className="border p-2 w-full" placeholder="שם משתמש" required />
          <input name="password" type="password" className="border p-2 w-full" placeholder="סיסמה" required />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">התחבר</button>
        </form>
      )}

      {view === "home" && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">שלום, {user}</h1>
          <p>⭐️ סימולציות אחרונות: 2</p>
          <p>🧠 טיפ אישי: זכור להוסיף אמפתיה גם בלחץ</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setView("select")}>בצע סימולציה חדשה</button>
        </div>
      )}

      {view === "select" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">בחר סימולציה</h2>
          {scenarios.map((s, i) => (
            <button
              key={i}
              className="block w-full border p-2 hover:bg-gray-100 text-right"
              onClick={() => startSimulation(s)}
            >
              {s.category} › {s.sub} › {s.topic} ({s.difficulty})
            </button>
          ))}
        </div>
      )}

      {view === "simulation" && scenario && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">סימולציה: {scenario.topic}</h2>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="w-full p-2 border"
            rows={4}
            placeholder="מה היית עונה ללקוח?"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={analyzeResponse}>נתח תגובה</button>
          {analysis && (
            <div className="mt-4">
              <h3 className="font-semibold">פידבק:</h3>
              <ul className="list-disc list-inside">
                {analysis.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}