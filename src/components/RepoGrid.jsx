import { RepoCard } from "./RepoCard";

export const RepoGrid = ({ repos }) => {
  if (repos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No repositories found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          name={repo.name}
          description={repo.description}
          stars={repo.stargazers_count}
          forks={repo.forks_count}
          language={repo.language}
          url={repo.html_url}
          updatedAt={repo.updated_at}
        />
      ))}
    </div>
  );
};
