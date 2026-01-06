import { Star, GitFork, ExternalLink, Circle } from "lucide-react";

export const RepoCard = ({ name, description, stars, forks, language, url, updatedAt }) => {
  // console.log("updatedAt: ",updatedAt);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="card-hover bg-card border-border p-4 h-full flex flex-col rounded-lg border text-card-foreground shadow-sm">
      <div className="flex flex-col mb-4 ">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0 text-start">
            <h3 className="text-xl truncate">{name}</h3>
            <p className="text-muted-foreground text-sm">
              Updated {formatDate(updatedAt)}
            </p>
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <p className="text-sm text-foreground/80 mb-4 line-clamp-2 text-start">
          {description || "No description provided"}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{stars.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              <span>{forks.toLocaleString()}</span>
            </div>
          </div>
          {language && (
            <div variant="secondary" className="flex items-center gap-1">
              <Circle className="h-2 w-2 fill-current" />
              {language}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
