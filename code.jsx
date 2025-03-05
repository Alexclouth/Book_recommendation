/** @jsxImportSource https://esm.sh/react@18.2.0 */
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import React from "https://esm.sh/react@18.2.0";

function App() {
  const [userPreferences, setUserPreferences] = React.useState({
    favoriteGenres: [],
    favoriteAuthors: [],
    readBooks: [],
    readingLevel: "Casual",
    preferredLanguage: "English",
    minPages: 100,
    maxPages: 1000,
    publicationYearRange: [1900, new Date().getFullYear()],
    tags: [],
    mood: "",
    complexity: "",
    themes: [],
    recommendationType: "Diverse",
  });
  const [recommendations, setRecommendations] = React.useState([]);
  const [recommendationReason, setRecommendationReason] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState("");
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = React.useState(false);
  const [authorInput, setAuthorInput] = React.useState("");

  const availableTags = [
    "Award Winner",
    "Bestseller",
    "Classic",
    "Contemporary",
    "International",
    "Translated",
    "Debut Novel",
    "Cult Favorite",
  ];

  const availableThemes = [
    "Personal Growth",
    "Social Justice",
    "Adventure",
    "Cultural Exploration",
    "Technological Innovation",
    "Psychological Depth",
    "Environmental Awareness",
    "Historical Insight",
  ];

  const moodOptions = [
    "Inspirational",
    "Thought-Provoking",
    "Relaxing",
    "Challenging",
    "Escapist",
    "Emotional",
  ];

  const complexityLevels = [
    "Light",
    "Moderate",
    "Complex",
    "Academic",
  ];

  const recommendationTypes = [
    "Diverse",
    "Similar to Favorites",
    "Completely New",
    "Cultural Exploration",
  ];

  const loadingMessages = [
    "🌍 Exploring global literary landscapes...",
    "🔍 Diving deep into book universes...",
    "✨ Crafting your perfect reading journey...",
    "📚 Unlocking literary treasures...",
    "🌟 Curating your next great read...",
  ];

  const handleGetRecommendations = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendations([]);
    setRecommendationReason("");

    const messageInterval = setInterval(() => {
      setLoadingMessage(
        loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
      );
    }, 2000);

    try {
      const response = await fetch("/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPreferences),
      });

      const data = await response.json();
      setRecommendations(data.books);
      setRecommendationReason(data.reason);
    } catch (error) {
      console.error("Recommendation error:", error);
    } finally {
      clearInterval(messageInterval);
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const handleGenreToggle = (genre) => {
    setUserPreferences(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre],
    }));
  };

  const handleTagToggle = (tag) => {
    setUserPreferences(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleThemeToggle = (theme) => {
    setUserPreferences(prev => ({
      ...prev,
      themes: prev.themes.includes(theme)
        ? prev.themes.filter(t => t !== theme)
        : [...prev.themes, theme],
    }));
  };

  const handleAddAuthor = () => {
    const trimmedAuthor = authorInput.trim();

    if (
      trimmedAuthor && !userPreferences.favoriteAuthors.map(a => a.toLowerCase()).includes(trimmedAuthor.toLowerCase())
    ) {
      setUserPreferences(prev => ({
        ...prev,
        favoriteAuthors: [...prev.favoriteAuthors, trimmedAuthor], // Store as an array
      }));
      setAuthorInput(""); // Reset input field
    }
  };

  const handleRemoveAuthor = (authorToRemove) => {
    setUserPreferences(prev => ({
      ...prev,
      favoriteAuthors: prev.favoriteAuthors.filter(author => author !== authorToRemove),
    }));
  };

  return React.createElement(
    "div",
    { style: styles.container },
    React.createElement("h1", null, "🌐 Global Book Discovery Engine"),
    React.createElement(
      "form",
      { onSubmit: handleGetRecommendations },
      React.createElement(
        "div",
        { style: styles.section },
        React.createElement("h2", null, "📖 Your Reading Profile"),
        // Genre Selection
        React.createElement(
          "div",
          { style: styles.genreContainer },
          React.createElement("h3", null, "Favorite Genres"),
          React.createElement(
            "div",
            { style: styles.genreButtonGroup },
            [
              "Fiction",
              "Non-Fiction",
              "Science Fiction",
              "Mystery",
              "Fantasy",
              "Romance",
              "Thriller",
              "Historical",
              "Poetry",
              "Biography",
            ].map(genre =>
              React.createElement("button", {
                type: "button",
                key: genre,
                onClick: () => handleGenreToggle(genre),
                style: {
                  ...styles.genreButton,
                  backgroundColor: userPreferences.favoriteGenres.includes(genre)
                    ? "#4CAF50"
                    : "#f1f1f1",
                  color: userPreferences.favoriteGenres.includes(genre)
                    ? "white"
                    : "black",
                },
              }, genre)
            ),
          ),
        ),
        // Advanced Filters Toggle
        React.createElement("button", {
          type: "button",
          onClick: () => setAdvancedFiltersOpen(!advancedFiltersOpen),
          style: styles.toggleButton,
        }, advancedFiltersOpen ? "🔼 Hide Advanced Filters" : "🔽 Show Advanced Filters"),
        // Advanced Filters Section
        advancedFiltersOpen && React.createElement(
          "div",
          { style: styles.advancedFiltersContainer },
          // Themes Selection
          React.createElement(
            "div",
            { style: styles.filterSection },
            React.createElement("h3", null, "🌈 Themes"),
            React.createElement(
              "div",
              { style: styles.buttonGroup },
              availableThemes.map(theme =>
                React.createElement("button", {
                  type: "button",
                  key: theme,
                  onClick: () => handleThemeToggle(theme),
                  style: {
                    ...styles.filterButton,
                    backgroundColor: userPreferences.themes.includes(theme)
                      ? "#2196F3"
                      : "#f1f1f1",
                    color: userPreferences.themes.includes(theme)
                      ? "white"
                      : "black",
                  },
                }, theme)
              ),
            ),
          ),
          // Mood Selection
          React.createElement(
            "div",
            { style: styles.filterSection },
            React.createElement("h3", null, "😊 Reading Mood"),
            React.createElement(
              "select",
              {
                value: userPreferences.mood,
                onChange: (e) =>
                  setUserPreferences(prev => ({
                    ...prev,
                    mood: e.target.value,
                  })),
                style: styles.select,
              },
              React.createElement("option", { value: "" }, "Select Mood"),
              ...moodOptions.map(mood => React.createElement("option", { value: mood }, mood)),
            ),
          ),
          // Complexity Level
          React.createElement(
            "div",
            { style: styles.filterSection },
            React.createElement("h3", null, "🧠 Reading Complexity"),
            React.createElement(
              "select",
              {
                value: userPreferences.complexity,
                onChange: (e) =>
                  setUserPreferences(prev => ({
                    ...prev,
                    complexity: e.target.value,
                  })),
                style: styles.select,
              },
              React.createElement("option", { value: "" }, "Select Complexity"),
              ...complexityLevels.map(level => React.createElement("option", { value: level }, level)),
            ),
          ),
          // Recommendation Type
          React.createElement(
            "div",
            { style: styles.filterSection },
            React.createElement("h3", null, "🎯 Recommendation Strategy"),
            React.createElement("select", {
              value: userPreferences.recommendationType,
              onChange: (e) =>
                setUserPreferences(prev => ({
                  ...prev,
                  recommendationType: e.target.value,
                })),
              style: styles.select,
            }, ...recommendationTypes.map(type => React.createElement("option", { value: type }, type))),
          ),
        ),
        // Author Input Section
        React.createElement(
          "div",
          { style: styles.filterSection },
          React.createElement("h3", null, "✍️ Favorite Authors"),
          React.createElement(
            "div",
            { style: styles.authorInputContainer },
            React.createElement("input", {
              type: "text",
              value: authorInput,
              onChange: (e) => setAuthorInput(e.target.value),
              placeholder: "Enter an author name",
              style: styles.authorInput,
            }),
            React.createElement("button", {
              type: "button",
              onClick: handleAddAuthor,
              style: styles.addAuthorButton,
            }, "➕"),
          ),
          // Display added authors
          userPreferences.favoriteAuthors.length > 0
            && React.createElement(
              "div",
              { style: styles.authorChipsContainer },
              userPreferences.favoriteAuthors.map(author =>
                React.createElement(
                  "div",
                  {
                    key: author,
                    style: styles.authorChip,
                  },
                  author,
                  React.createElement("button", {
                    type: "button",
                    onClick: () => handleRemoveAuthor(author),
                    style: styles.removeAuthorButton,
                  }, "✖️"),
                )
              ),
            ),
        ),
        // Recommendations Button
        React.createElement("button", {
          type: "submit",
          style: styles.recommendButton,
        }, "🔍 Find My Perfect Books"),
      ),
    ),
    // Loading State
    isLoading
      && React.createElement("div", { style: styles.loadingContainer }, React.createElement("p", null, loadingMessage)),
    // Recommendations Display
    recommendations.length > 0
      && React.createElement(
        "div",
        { style: styles.recommendationsContainer },
        React.createElement("h2", null, "📚 Your Personalized Recommendations"),
        React.createElement("p", { style: styles.recommendationReason }, recommendationReason),
        recommendations.map((book, index) =>
          React.createElement(
            "div",
            {
              key: index,
              style: styles.bookRecommendation,
            },
            React.createElement("h3", null, book.title),
            React.createElement("p", null, `Author: ${book.author}`),
            React.createElement("p", null, `Genre: ${book.genre}`),
          )
        ),
      ),
  );
}

function client() {
  createRoot(document.getElementById("root")).render(React.createElement(App));
}

if (typeof document !== "undefined") {
  client();
}

export default async function server(request: Request): Promise<Response> {
  // Import OpenAI dynamically to avoid client-side import issues
  const { OpenAI } = await import("https://esm.town/v/std/openai");
  const openai = new OpenAI();

  // Handle recommendations endpoint
  if (request.method === "POST" && new URL(request.url).pathname === "/recommendations") {
    try {
      // Parse user preferences from the request
      const userPreferences = await request.json();

      // Construct a detailed prompt for book recommendations
      const prompt = `
        Generate 6 highly personalized book recommendations based on these comprehensive preferences:
        
        Detailed Preferences:
        - Genres: ${userPreferences.favoriteGenres.join(", ") || "Any"}
        - Themes: ${userPreferences.themes.join(", ") || "Any"}
        - Reading Mood: ${userPreferences.mood || "Any"}
        - Complexity Level: ${userPreferences.complexity || "Any"}
        - Recommendation Type: ${userPreferences.recommendationType}
        - Favorite Authors: ${userPreferences.favoriteAuthors || "None specified"}
        - Tags: ${userPreferences.tags.join(", ") || "Any"}

        
        Additional Context:
        - Reading Level: ${userPreferences.readingLevel}
        - Preferred Language: ${userPreferences.preferredLanguage}
        - Page Count Range: ${userPreferences.minPages}-${userPreferences.maxPages} pages
        - Publication Year: ${userPreferences.publicationYearRange[0]}-${userPreferences.publicationYearRange[1]}
        

        Recommendation Strategy:
        - If "Diverse", provide books from different genres and cultural backgrounds
        - If "Similar to Favorites", recommend books close to known preferences
        - If "Completely New", suggest books outside current reading patterns
        - If "Cultural Exploration", focus on international and translated works

        For each book, provide:
        - Title
        - Author
        - Genre
        - A compelling 2-3 sentence explanation of why this book matches the preferences
        - Unique selling point or distinctive feature

        Format the response as a strict JSON object with a 'books' array.
      `;

      // Generate recommendations using OpenAI
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        max_tokens: 1000,
      });

      // Parse the AI-generated recommendations
      const aiResponse = JSON.parse(completion.choices[0].message.content);

      // Prepare the response
      const recommendations = {
        books: aiResponse.books.map(book => ({
          title: book.title,
          author: book.author,
          genre: book.genre,
          description: book.description,
          source: "AI-Powered Global Book Discovery",
        })),
        reason: "Curated by advanced AI to match your unique reading preferences and exploration goals",
      };

      return new Response(JSON.stringify(recommendations), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("OpenAI Recommendation Error:", error);
      return new Response(
        JSON.stringify({
          books: [],
          reason: "Unable to generate recommendations. Please try again.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }

  // Render the main HTML page
  return new Response(
    `
    <html>
      <head>
        <title>Global Book Discovery Engine</title>
        <style>${css}</style>
      </head>
      <body>
        <div id="root"></div>
        <script src="https://esm.town/v/std/catch"></script>
        <script type="module" src="${import.meta.url}"></script>
      </body>
    </html>
  `,
    {
      headers: { "Content-Type": "text/html" },
    },
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f4f6f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  section: {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  genreContainer: {
    marginBottom: "15px",
  },
  genreButtonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  genreButton: {
    padding: "8px 12px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  advancedFiltersContainer: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  filterSection: {
    marginBottom: "15px",
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  filterButton: {
    padding: "8px 12px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  toggleButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  authorInputContainer: {
    display: "flex",
    marginBottom: "10px",
  },
  authorInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px 0 0 5px",
    border: "1px solid #ddd",
  },
  addAuthorButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
  },
  authorChipsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "15px",
  },
  authorChip: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "0.9em",
  },
  removeAuthorButton: {
    background: "none",
    border: "none",
    marginLeft: "5px",
    cursor: "pointer",
  },
  recommendButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
  },
  recommendationsContainer: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  recommendationReason: {
    fontStyle: "italic",
    color: "#666",
    marginBottom: "15px",
  },
  bookRecommendation: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
};

const css = `
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
}
`;