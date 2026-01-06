import { ExternalLink, MapPin, Building, Link2, Users, UserPlus } from "lucide-react";

export const UserHeader = ({
  username,
  avatarUrl, 
  name,
  bio,
  publicRepos,
  profileUrl,
  location,
  company,
  blog,
  twitterUsername,
  followers,
  following,
  githubLink
}) => {

  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start gap-6 p-6">
        <div className="flex flex-col space-y-2">
          <div className="h-30 w-30 border-2 border-primary relative flex  shrink-0 overflow-hidden rounded-full">
            <img src={avatarUrl} alt={username} className="aspect-square h-full w-full"  />
            <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">{username.slice(0, 2).toUpperCase()}</div> // to show initials if no image
          </div>
          <button className="h-10 px-4 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground">
            <a href={githubLink} target="_blank">View on GitHub</a>
          </button>
        </div>
        
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-foreground">{name || username}</h2>
            <a href={profileUrl} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
          
          <p className="text-muted-foreground mb-3 text-start">@{username}</p>

          {bio && <p className="text-sm text-foreground/80 mb-4 text-start">{bio}</p>}

          {/* Additional Info */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}

            {company && (
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span>{company}</span>
              </div>
            )}

            {blog && (
              <a href={formatUrl(blog)} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-accent transition-colors"
              >
                <Link2 className="h-4 w-4" />
                <span className="truncate max-w-[200px]">{blog}</span>
              </a>
            )}

            {twitterUsername && (
              <a
                href={`https://twitter.com/${twitterUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-accent transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>@{twitterUsername}</span>
              </a>
            )}
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span className="font-semibold">{followers.toLocaleString()}</span> followers
            </div>
            <div variant="secondary" className="flex items-center gap-1">
              <UserPlus className="h-3 w-3" />
              <span className="font-semibold">{following.toLocaleString()}</span> following
            </div>
            <div variant="secondary" className="text-accent">
              {publicRepos.toLocaleString()} repositories
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
