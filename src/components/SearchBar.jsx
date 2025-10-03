import { Search } from "lucide-react";

export const SearchBar = ({ value, setUsername, fetchUserData, isLoading, }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchUserData();
    }
  };


  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input type="text" placeholder="Enter GitHub username..." value={value}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 flex  w-full rounded-md border border-border bg-card px-3 py-2 text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={fetchUserData}
          disabled={isLoading || !value.trim()}
          className="h-12 px-8 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-github-muted">Try:</span>
        {['octocat', 'torvalds', 'gaearon', 'sindresorhus', 'tj'].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              // setUsername(suggestion);
              fetchUserData(suggestion);
            }}
            disabled={isLoading}
            className="px-3 py-1 text-sm bg-github-gray/50 text-github-muted hover:text-github-text hover:bg-github-gray border border-github-border rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
